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
        return <BentoDashboard onNavigate={setCurrentView} />;
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
        return <BentoDashboard onNavigate={setCurrentView} />;
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
          className={cn("relative flex flex-col items-center gap-1 transition-all", currentView === "chat" ? "text-brand-blue scale-110" : "text-brand-slate")}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-[10px] font-bold">Chat</span>
          <span className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[8px] font-black text-white shadow-lg shadow-brand-red/20">
            3
          </span>
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



