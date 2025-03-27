import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuthStore } from '../utils/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { login, authError, clearError, user, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/chat');
    }
  }, [user, navigate]);
  
  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);
  
  // Funkcija za automatsko popunjavanje kredencijala
  const fillAndLogin = useCallback(async () => {
    const predefinedEmail = 'moracayu@yahoo.com';
    const predefinedPassword = 'moraca123';
    
    setEmail(predefinedEmail);
    setPassword(predefinedPassword);
    
    // Sačekamo malo da se polja popune
    setTimeout(async () => {
      try {
        await login(predefinedEmail, predefinedPassword);
      } catch (err) {
        console.error('Automatsko prijavljivanje nije uspelo:', err);
      }
    }, 300);
  }, [login]);
  
  // Automatski popunimo kredencijale kada se komponenta učita
  useEffect(() => {
    fillAndLogin();
  }, [fillAndLogin]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Validate form
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password) {
      setFormError('Password is required');
      return;
    }
    
    // Submit form
    await login(email, password);
  };
  
  return (
    <div className="flex min-h-screen bg-background dark">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-blue-600 to-blue-800 items-center justify-center">
        <div className="max-w-md text-white p-8">
          <h1 className="text-4xl font-bold mb-6">Welcome Back to IntelliChat</h1>
          <p className="text-lg mb-8">
            Log in to access advanced AI-powered conversations and unlock your business potential.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">24/7 AI Assistance</h3>
                <p className="text-sm text-blue-100">Always ready to help, anytime you need it</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Business Optimized</h3>
                <p className="text-sm text-blue-100">Designed for professionals and enterprises</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                  <path d="M16 9.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Sign in to IntelliChat</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {(formError || authError) && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 rounded-md p-3 mb-4">
                {formError || authError}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-background"
                  placeholder="name@company.com"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-background"
                  placeholder="••••••••"
                />
              </div>
              
              <Button
                type="submit"
                variant="accent"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
