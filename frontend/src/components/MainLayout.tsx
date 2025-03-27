import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../utils/authStore";
import { UserMenu } from "./UserMenu";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  
  // Function to check if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-background dark">
      {/* Sidebar */}
      {user && (
        <aside className="hidden md:flex flex-col w-64 border-r border-border bg-secondary/5">
          {/* Logo */}
          <div className="flex items-center space-x-2 p-4 border-b border-border h-16">
            <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                <path d="M16 9.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold">IntelliChat</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-grow p-4 space-y-1">
            <button
              onClick={() => navigate("/")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${isActive("/") ? "bg-blue-600/10 text-blue-600" : "hover:bg-secondary"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Home</span>
            </button>
            
            <button
              onClick={() => navigate("/chat")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${isActive("/chat") ? "bg-blue-600/10 text-blue-600" : "hover:bg-secondary"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Chat</span>
            </button>
            
            <button
              onClick={() => navigate("/profile")}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${isActive("/profile") ? "bg-blue-600/10 text-blue-600" : "hover:bg-secondary"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </button>
          </nav>
        </aside>
      )}
      
      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            {!user || window.innerWidth < 768 ? (
              <>
                <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                    <path d="M16 9.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
                  </svg>
                </div>
                <h1 className="text-xl font-bold">IntelliChat</h1>
              </>
            ) : null}
          </div>
          
          {/* Mobile navigation */}
          {user && window.innerWidth < 768 ? (
            <div className="md:hidden flex space-x-1">
              <button
                onClick={() => navigate("/")}
                className={`p-2 rounded-md ${isActive("/") ? "bg-blue-600/10 text-blue-600" : "hover:bg-secondary"}`}
                aria-label="Home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </button>
              
              <button
                onClick={() => navigate("/chat")}
                className={`p-2 rounded-md ${isActive("/chat") ? "bg-blue-600/10 text-blue-600" : "hover:bg-secondary"}`}
                aria-label="Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              
              <button
                onClick={() => navigate("/profile")}
                className={`p-2 rounded-md ${isActive("/profile") ? "bg-blue-600/10 text-blue-600" : "hover:bg-secondary"}`}
                aria-label="Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            </div>
          ) : null}
          
          <div>
            {user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  className="text-sm px-3 py-1.5 border border-border rounded-md hover:bg-secondary transition-colors"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
                <button 
                  className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
