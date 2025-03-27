from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.apis.chat import router as chat_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # za frontend testiranje
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")
