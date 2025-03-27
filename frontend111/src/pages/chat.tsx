import React, { useState, useRef, useEffect } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../utils/chatStore";
import { useAuthStore } from "../utils/authStore";
import { useChatHistoryStore } from "../utils/chatHistoryStore";
// Chat je sada dostupan svima, ne treba nam ProtectedRoute
import { MainLayout } from "../components/MainLayout";
import { ChatHistory } from "../components/ChatHistory";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Chat() {
  return <ChatContent />; // Chat sadržaj dostupan svima
}

function ChatContent() {
  const navigate = useNavigate();
  const { messages, sendMessage, isLoading, chatId, saveConversation } = useChatStore();
  const { fetchChatList } = useChatHistoryStore();
  const { user } = useAuthStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [conversationTitle, setConversationTitle] = useState("");
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Fetch chat history when component mounts
  useEffect(() => {
    if (user) {
      fetchChatList(user.uid);
    }
  }, [user, fetchChatList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    sendMessage(input);
    setInput("");
  };
  
  const handleSaveConversation = async () => {
    if (!user) {
      // Ako korisnik nije prijavljen, preusmeriti na stranicu za prijavu
      navigate('/login');
      return;
    }
    
    await saveConversation(conversationTitle);
    setSaveDialogOpen(false);
    setConversationTitle("");
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4 border-b border-border">
          <div className="flex space-x-2">
            {user && (
              <button 
                onClick={() => setSaveDialogOpen(true)}
                className="flex items-center space-x-1 text-sm p-2 rounded-md hover:bg-secondary transition-colors"
                title="Save conversation"
                disabled={messages.length === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                <span>Save</span>
              </button>
            )}
            {user && (
              <button 
                onClick={() => setHistoryOpen(true)}
                className="flex items-center space-x-1 text-sm p-2 rounded-md hover:bg-secondary transition-colors"
                title="Chat history"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"/>
                  <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
                <span>History</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Start a Conversation</h2>
              <p className="text-muted-foreground max-w-md">
                Ask a question, get recommendations, or start a discussion with our AI assistant.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-secondary rounded-tl-none'}`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-secondary rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-grow rounded-full bg-muted p-2 px-4 outline-none focus:ring-2 focus:ring-blue-600 text-foreground"
            />
            <Button 
              type="submit" 
              disabled={isLoading || input.trim() === ""}
              variant="accent" 
              className="rounded-full p-2 w-10 h-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </Button>
          </form>
        </div>
        
        {/* Chat History Dialog */}
        <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
          <Dialog.Content className="sm:max-w-[350px] p-0 h-[80vh]">
            <Dialog.Header className="p-4 border-b border-border">
              <Dialog.Title>Chat History</Dialog.Title>
              <Dialog.Description className="text-xs text-muted-foreground">
                View and manage your previous conversations
              </Dialog.Description>
            </Dialog.Header>
            
            <div className="h-[calc(80vh-4rem)]">
              <ChatHistory onClose={() => setHistoryOpen(false)} />
            </div>
          </Dialog.Content>
        </Dialog>
        
        {/* Save Dialog */}
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <Dialog.Content className="sm:max-w-[425px]">
            <Dialog.Header>
              <Dialog.Title>Save Conversation</Dialog.Title>
              <Dialog.Description>
                Give your conversation a title to easily find it later
              </Dialog.Description>
            </Dialog.Header>
            
            <div className="py-4">
              <Input
                value={conversationTitle}
                onChange={(e) => setConversationTitle(e.target.value)}
                placeholder="Conversation title"
                className="w-full"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2">
                Leave blank to auto-generate a title based on the conversation content
              </p>
            </div>
            
            <Dialog.Footer>
              <Button
                variant="outline"
                onClick={() => setSaveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveConversation}
              >
                Save Conversation
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>
    </MainLayout>
  );
}