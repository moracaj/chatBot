import React from "react";

export function ChatPlaceholder() {
  return (
    <div className="h-96 bg-secondary/20 backdrop-blur-sm rounded-xl border border-border/50 p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-grow space-y-4 overflow-y-auto p-4">
          <div className="flex items-start max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 mr-3" />
            <div className="bg-secondary p-3 rounded-lg rounded-tl-none">
              <p>How can I assist you today?</p>
            </div>
          </div>
          
          <div className="flex items-start flex-row-reverse max-w-[80%] ml-auto">
            <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0 ml-3" />
            <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none">
              <p>I need help with creating a project roadmap.</p>
            </div>
          </div>
          
          <div className="flex items-start max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 mr-3" />
            <div className="bg-secondary p-3 rounded-lg rounded-tl-none">
              <p>I'd be happy to help with your roadmap. Let's start by defining the key objectives and milestones for your project...</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center">
            <div className="flex-grow bg-muted rounded-full p-2 pl-4 flex items-center">
              <span className="text-muted-foreground">Type your message...</span>
              <div className="ml-auto w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}