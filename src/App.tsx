/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { ThinkTankModule } from "./components/ThinkTankModule";
import { KnowledgeExchangeModule } from "./components/KnowledgeExchangeModule";
import { ChatModule } from "./components/ChatModule";
import { EntrepreneurDirectory } from "./components/EntrepreneurDirectory";
import { 
  Home, 
  Brain, 
  Users, 
  MessageSquare, 
  Handshake,
  User
} from "lucide-react";
import { cn } from "@/src/lib/utils";

type View = "home" | "think-tank" | "exchange" | "chat" | "directory" | "profile";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Dashboard />;
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
            <KnowledgeExchangeModule /> {/* Reusing for profile tab */}
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bone font-sans text-brand-blue antialiased">
      <Header />
      
      <main className="pb-20 lg:pb-8">
        {renderView()}
      </main>
      
      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-brand-gold/20 bg-white px-4 lg:hidden">
        <button 
          onClick={() => setCurrentView("home")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "home" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button 
          onClick={() => setCurrentView("think-tank")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "think-tank" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <Brain className="h-5 w-5" />
          <span className="text-[10px] font-bold">Ideas</span>
        </button>
        <button 
          onClick={() => setCurrentView("exchange")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "exchange" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <Users className="h-5 w-5" />
          <span className="text-[10px] font-bold">Talento</span>
        </button>
        <button 
          onClick={() => setCurrentView("chat")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "chat" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-[10px] font-bold">Chat</span>
        </button>
        <button 
          onClick={() => setCurrentView("directory")}
          className={cn("flex flex-col items-center gap-1 transition-all", currentView === "directory" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <Handshake className="h-5 w-5" />
          <span className="text-[10px] font-bold">Apoyo</span>
        </button>
      </nav>
    </div>
  );
}



