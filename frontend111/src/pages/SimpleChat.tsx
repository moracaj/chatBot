import React, { useState, useRef, useEffect } from "react";
import { Button } from "../components/Button";
import { useSimpleChatStore } from "../utils/simpleChatStore";
import { MainLayout } from "../components/MainLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// Javna chat stranica bez zaštite - direktno kopirana iz GuestChat ali bez UserGuard
export default function SimpleChat() {
  const { messages, sendMessage, isLoading, clearMessages } = useSimpleChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [modelSetting, setModelSetting] = useState("gpt-4o-mini");
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Set the model preference
  useEffect(() => {
    useSimpleChatStore.getState().setModelOverride(modelSetting);
  }, [modelSetting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    sendMessage(input);
    setInput("");
  };
  
  const handleClearChat = () => {
    clearMessages();
    setSettingsOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4 border-b border-border">
          <div className="flex space-x-2">
            <button 
              onClick={() => setSettingsOpen(true)}
              className="flex items-center space-x-1 text-sm p-2 rounded-md hover:bg-secondary transition-colors"
              title="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <span>Settings</span>
            </button>
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
        
        {/* Settings Dialog */}
        <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Chat Settings</DialogTitle>
              <DialogDescription>
                Customize your chat experience
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <select 
                  value={modelSetting}
                  onChange={(e) => setModelSetting(e.target.value)}
                  className="w-full rounded-md bg-muted p-2 px-3 text-foreground outline-none"
                >
                  <option value="gpt-4o-mini">GPT-4o Mini (Fast)</option>
                  <option value="gpt-4o">GPT-4o (Advanced)</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button
                  variant="destructive"
                  onClick={handleClearChat}
                  className="w-full"
                  disabled={messages.length === 0}
                >
                  Clear Conversation
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSettingsOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
