import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { HeroSection } from "../components/HeroSection";
import { FeatureCard } from "../components/FeatureCard";
import { ChatPlaceholder } from "../components/ChatPlaceholder";
import { useTheme } from "@/hooks/use-theme";
// OpenAI-only version - no auth stores
// OpenAI-only version - no Firebase imports
// OpenAI-only version - no Firebase imports
// OpenAI-only version - no user menu

export default function App() {
  const navigate = useNavigate();
  // No user authentication in OpenAI-only version
  
  // Theme management
  const { theme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen bg-background dark">
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
              <path d="M16 9.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold">IntelliChat</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="accent" onClick={() => navigate('/simple-chat')}>Start Chatting</Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto py-20 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <HeroSection 
              title="AI-Powered Conversations for Business Professionals"
              subtitle="Experience intelligent, contextual conversations that help you streamline workflows, gather insights, and make informed decisions faster than ever before."
              ctaText="Start Chatting Now"
            />
            <div className="order-first lg:order-last">
              <ChatPlaceholder />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-20 px-4 bg-muted/20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful AI Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              IntelliChat delivers intelligent solutions that transform how business professionals work and communicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Contextual Understanding"
              description="Our AI comprehends the full context of your conversations, delivering more relevant and accurate responses."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              }
            />
            <FeatureCard
              title="Business Intelligence"
              description="Get insights, analytics, and data-driven recommendations to make better business decisions."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M2 20h20"></path>
                  <path d="M5 14v6"></path>
                  <path d="M10 10v10"></path>
                  <path d="M15 4v16"></path>
                  <path d="M20 7v13"></path>
                </svg>
              }
            />
            <FeatureCard
              title="Time-Saving Automation"
              description="Automate routine tasks and communications, freeing up your time for high-value work."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              }
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto py-20 px-4">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your workflow?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start using IntelliChat today and experience the power of AI-driven conversations tailored for business professionals.
            </p>
            <Button 
              variant="accent" 
              size="xl"
              onClick={() => navigate('/simple-chat')}
            >
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-8 px-4 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                <path d="M16 9.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0"></path>
              </svg>
            </div>
            <span className="text-sm font-medium">IntelliChat © 2025</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
