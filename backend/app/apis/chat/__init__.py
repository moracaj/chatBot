from fastapi import APIRouter, HTTPException, Request, status
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from openai import OpenAI
import time
from datetime import datetime
import re
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/chat", tags=["public"])

# Rate limiter
class RateLimiter:
    def __init__(self, requests_per_minute: int = 10):
        self.requests_per_minute = requests_per_minute
        self.request_history: Dict[str, List[float]] = {}
        
    def is_rate_limited(self, client_id: str) -> bool:
        current_time = time.time()
        minute_ago = current_time - 60

        if client_id not in self.request_history:
            self.request_history[client_id] = []

        self.request_history[client_id] = [ts for ts in self.request_history[client_id] if ts > minute_ago]

        if len(self.request_history[client_id]) >= self.requests_per_minute:
            return True

        self.request_history[client_id].append(current_time)
        return False

rate_limiter = RateLimiter(requests_per_minute=15)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    model: str = "gpt-4o-mini"
    temperature: float = Field(default=0.7, ge=0.0, le=2.0)
    max_tokens: int = Field(default=1000, gt=0, le=4096)
    stream: bool = False

class ChatResponse(BaseModel):
    message: Message
    usage: Optional[Dict[str, Any]] = None
    model: str = "gpt-4o-mini"
    created: int = Field(default_factory=lambda: int(time.time()))

@router.post("/completions")
async def chat_completions(
    request: Request,
    body: ChatRequest
) -> ChatResponse:
    client_id = request.client.host if request.client else "unknown"

    if rate_limiter.is_rate_limited(client_id):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please try again later."
        )

    if not body.messages:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No messages provided"
        )

    try:
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if not openai_api_key:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="OpenAI API key not configured"
            )

        client = OpenAI(api_key=openai_api_key)

        start_time = time.time()

        completion = client.chat.completions.create(
            model=body.model,
            messages=[{"role": msg.role, "content": msg.content} for msg in body.messages],
            temperature=body.temperature,
            max_tokens=body.max_tokens
        )

        usage_data = None
        if hasattr(completion, 'usage') and completion.usage:
            usage_data = {
                "prompt_tokens": completion.usage.prompt_tokens,
                "completion_tokens": completion.usage.completion_tokens,
                "total_tokens": completion.usage.total_tokens
            }

        return ChatResponse(
            message=Message(
                role="assistant",
                content=completion.choices[0].message.content
            ),
            usage=usage_data,
            model=body.model,
            created=int(time.time())
        )

    except Exception as e:
        error_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{error_time}] Error calling OpenAI API: {str(e)}")

        if "Unauthorized" in str(e):
            raise HTTPException(status_code=401, detail="Invalid API key")
        elif "Rate limit" in str(e):
            raise HTTPException(status_code=429, detail="OpenAI API rate limit exceeded")
        elif "context_length_exceeded" in str(e):
            raise HTTPException(status_code=400, detail="Input too long")
        else:
            raise HTTPException(status_code=500, detail=f"Error: {str(e)}")