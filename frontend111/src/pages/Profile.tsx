import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/authStore";
import { useChatStore } from "../utils/chatStore";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { MainLayout } from "../components/MainLayout";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Button } from "../components/Button";
import { useTheme } from "../internal-components/ThemeProvider";

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const { apiKey, setApiKey } = useChatStore();
  
  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [company, setCompany] = useState(profile?.company || "");
  const [jobTitle, setJobTitle] = useState(profile?.jobTitle || "");
  const [openAIKey, setOpenAIKey] = useState(apiKey || "");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o-mini");
  
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
      setCompany(profile.company || "");
      setJobTitle(profile.jobTitle || "");
    }
  }, [profile]);
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    setSavedMessage("");
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        company,
        jobTitle,
      });
      
      // Save API key to local state
      setApiKey(openAIKey);
      
      setSavedMessage("Settings saved successfully!");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setSavedMessage("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>
        
        {savedMessage && (
          <div className={`p-3 mb-6 rounded-md ${
            savedMessage.includes("Error") ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
          }`}>
            {savedMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2 uppercase tracking-wider text-xs">Profile Information</h2>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="text" 
                  value={user?.email || ""}
                  disabled
                  className="w-full rounded-md bg-muted p-2 px-3 text-foreground disabled:opacity-70"
                />
                <p className="text-xs text-muted-foreground">Your email cannot be changed</p>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Display Name</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-md bg-muted p-2 px-3 text-foreground focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Company</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-md bg-muted p-2 px-3 text-foreground focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Your company"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Job Title</label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-md bg-muted p-2 px-3 text-foreground focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Your job title"
                />
              </div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2 uppercase tracking-wider text-xs">API Settings</h2>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">OpenAI API Key (Optional)</label>
                <input 
                  type="password" 
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  className="w-full rounded-md bg-muted p-2 px-3 text-foreground focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="sk-..."
                />
                <p className="text-xs text-muted-foreground">Use your own API key for better chat response limits</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Model</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full rounded-md bg-muted p-2 px-3 text-foreground focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="gpt-4o-mini">GPT-4o Mini (Fastest)</option>
                  <option value="gpt-4o">GPT-4o (Most Capable)</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Legacy)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2 uppercase tracking-wider text-xs">UI Settings</h2>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`rounded-md p-2 flex items-center justify-center ${theme === "light" ? "bg-blue-600 text-white" : "bg-muted text-foreground"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    Light
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`rounded-md p-2 flex items-center justify-center ${theme === "dark" ? "bg-blue-600 text-white" : "bg-muted text-foreground"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    Dark
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`rounded-md p-2 flex items-center justify-center ${theme === "system" ? "bg-blue-600 text-white" : "bg-muted text-foreground"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y1="21"/>
                    </svg>
                    System
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold border-b border-border pb-2 uppercase tracking-wider text-xs">Account</h2>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Member since: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last login: {profile?.lastLogin ? new Date(profile.lastLogin).toLocaleDateString() : "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button
            variant="outline"
            size="default"
            onClick={() => navigate("/chat")}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            size="default"
            onClick={handleSaveProfile}
            disabled={saving}
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : "Save Settings"}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
