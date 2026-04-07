/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Header } from "./components/Header";
import { BentoDashboard } from "./components/BentoDashboard";
import { ThinkTankModule } from "./components/ThinkTankModule";
import { KnowledgeExchangeModule } from "./components/KnowledgeExchangeModule";
import { ChatModule } from "./components/ChatModule";
import { EntrepreneurDirectory } from "./components/EntrepreneurDirectory";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { AdminPanel } from "./components/AdminPanel";
import { ProfileView } from "./components/ProfileView";
import { 
  Home, 
  Brain, 
  Users, 
  MessageSquare, 
  Handshake,
  User,
  Shield
} from "lucide-react";
import { cn } from "@/src/lib/utils";

type View = "home" | "think-tank" | "exchange" | "chat" | "directory" | "profile" | "admin";

function AppContent() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile } = useAuth();

  const handleNavigate = (view: View) => {
    if (view === "chat" && !user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (view === "admin" && profile?.role !== 'super_admin') {
      return;
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <BentoDashboard onNavigate={handleNavigate} />;
      case "think-tank":
        return <ThinkTankModule />;
      case "exchange":
        return <KnowledgeExchangeModule />;
      case "chat":
        return (
          <div className="container mx-auto px-4 py-8">
            <ChatModule />
          </div>
        );
      case "directory":
        return (
          <div className="container mx-auto px-4 py-8">
            <EntrepreneurDirectory />
          </div>
        );
      case "profile":
        return (
          <div className="container mx-auto px-4 py-8">
            <ProfileView onNavigate={handleNavigate} />
          </div>
        );
      case "admin":
        return (
          <div className="container mx-auto px-4 py-8">
            <AdminPanel />
          </div>
        );
      default:
        return <BentoDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-brand-bone font-sans text-brand-blue antialiased",
      currentView === "home" && "h-screen overflow-hidden"
    )}>
      {currentView !== "home" && <Header />}
      
      <main className={cn(
        "pb-20 lg:pb-8",
        currentView === "home" && "h-full pb-0"
      )}>
        {renderView()}
      </main>
      
      {/* Floating Navigation Bar */}
      <nav className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-16 w-[90%] max-w-md items-center justify-around rounded-[2rem] border border-brand-gold/20 bg-white/80 backdrop-blur-md px-6 shadow-2xl transition-all duration-300",
        currentView === "home" ? "bg-white/40 border-white/20" : "bg-white/80"
      )}>
        <button 
          onClick={() => handleNavigate("home")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "home" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button 
          onClick={() => handleNavigate("think-tank")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "think-tank" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <Brain className="h-5 w-5" />
          <span className="text-[10px] font-bold">Ideas</span>
        </button>
        <button 
          onClick={() => handleNavigate("exchange")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "exchange" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <Users className="h-5 w-5" />
          <span className="text-[10px] font-bold">Talento</span>
        </button>
        <button 
          onClick={() => handleNavigate("chat")}
          className={cn("relative flex flex-col items-center gap-1 transition-all", currentView === "chat" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-[10px] font-bold">Chat</span>
          <span className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[8px] font-black text-white shadow-lg shadow-brand-red/20">
            3
          </span>
        </button>
        
        {profile?.role === 'super_admin' ? (
          <button 
            onClick={() => handleNavigate("admin")}
            className={cn("flex flex-col items-center gap-1 transition-all", currentView === "admin" ? "text-brand-blue scale-110" : "text-brand-slate")}
          >
            <Shield className="h-5 w-5" />
            <span className="text-[10px] font-bold">Admin</span>
          </button>
        ) : (
          <button 
            onClick={() => handleNavigate("directory")}
            className={cn("flex flex-col items-center gap-1 transition-all", currentView === "directory" ? "text-brand-blue scale-110" : "text-brand-slate")}
          >
            <Handshake className="h-5 w-5" />
            <span className="text-[10px] font-bold">Apoyo</span>
          </button>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}



