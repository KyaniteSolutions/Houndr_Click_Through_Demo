import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChatInterface from './components/ChatInterface';
import { Toaster } from './components/ui/sonner';

type Page = 'landing' | 'login' | 'signup' | 'chat';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    setUser({ name: 'Demo User', email });
    setCurrentPage('chat');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock registration
    setUser({ name, email });
    setCurrentPage('chat');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" expand={false} richColors />
      {currentPage === 'landing' && (
        <LandingPage 
          onLogin={() => setCurrentPage('login')}
          onSignup={() => setCurrentPage('signup')}
        />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
          onSignup={() => setCurrentPage('signup')}
          onBack={() => setCurrentPage('landing')}
        />
      )}
      
      {currentPage === 'signup' && (
        <SignupPage 
          onSignup={handleSignup}
          onLogin={() => setCurrentPage('login')}
          onBack={() => setCurrentPage('landing')}
        />
      )}
      
      {currentPage === 'chat' && user && (
        <ChatInterface 
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}