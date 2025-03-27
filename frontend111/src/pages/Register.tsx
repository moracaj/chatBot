import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuthStore } from '../utils/authStore';

export default function Register() {
  const navigate = useNavigate();
  const { register, authError, clearError, user, isLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
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
  const fillAndRegister = useCallback(async () => {
    const predefinedEmail = 'moracayu@yahoo.com';
    const predefinedPassword = 'moraca123';
    const predefinedName = 'Moraca User';
    
    setEmail(predefinedEmail);
    setPassword(predefinedPassword);
    setConfirmPassword(predefinedPassword);
    setDisplayName(predefinedName);
    
    // Ako želite da se automatski registruje, odkomentarišite sledeće linije
    // setTimeout(async () => {
    //   try {
    //     await register(predefinedEmail, predefinedPassword, predefinedName);
    //   } catch (err) {
    //     console.error('Automatska registracija nije uspela:', err);
    //   }
    // }, 300);
  }, []);
  
  // Automatski popunimo kredencijale kada se komponenta učita
  useEffect(() => {
    fillAndRegister();
  }, [fillAndRegister]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Validate form
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!displayName.trim()) {
      setFormError('Name is required');
      return;
    }
    
    if (!password) {
      setFormError('Password is required');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    // Submit form
    await register(email, password, displayName, company, jobTitle);
  };
  
  return (
    <div className="flex min-h-screen bg-background dark">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-blue-600 to-blue-800 items-center justify-center">
        <div className="max-w-md text-white p-8">
          <h1 className="text-4xl font-bold mb-6">Join IntelliChat</h1>
          <p className="text-lg mb-8">
            Sign up today and start leveraging the power of AI for your business communications.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Personalized Experience</h3>
                <p className="text-sm text-blue-100">Tailored to your business needs</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Free Trial</h3>
                <p className="text-sm text-blue-100">Get started with no commitment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                  <path d="M16 9.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Create an account</h2>
            <p className="text-muted-foreground">
              Start your professional AI journey with IntelliChat
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {(formError || authError) && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 rounded-md p-3 mb-4">
                {formError || authError}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address *
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
                  <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-background"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-background"
                    placeholder="Acme Inc"
                  />
                </div>
                
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
                    Job Title
                  </label>
                  <input
                    id="jobTitle"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-background"
                    placeholder="Product Manager"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password *
                </label>
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
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-background"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
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
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </Button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
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
