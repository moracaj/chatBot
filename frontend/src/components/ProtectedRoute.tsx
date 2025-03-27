import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../utils/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user, isInitialized, authError } = useAuthStore();
  
  useEffect(() => {
    if (isInitialized && !user && !authError) {
      // Redirect to login if user is not authenticated and there are no auth errors
      navigate('/login');
    }
  }, [user, isInitialized, navigate, authError]);
  
  // Show loading state while auth is initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-600/20 border-t-blue-600 animate-spin"></div>
          </div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Show error message if authentication failed
  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark">
        <div className="flex flex-col items-center max-w-md p-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="text-xl font-bold">Authentication Error</h2>
          <p className="text-muted-foreground">{authError}</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    );
  }
  
  // If authenticated, render the children
  return user ? <>{children}</> : null;
}
