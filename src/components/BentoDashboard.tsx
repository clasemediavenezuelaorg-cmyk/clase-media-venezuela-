import { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Brain, 
  Handshake, 
  MessageSquare, 
  Play, 
  Bell,
  TrendingUp,
  User,
  Search,
  ChevronRight,
  Shield
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { CircularProgress } from "./CircularProgress";
import { YouTubeModal } from "./YouTubeModal";
import { useAuth } from "../context/AuthContext";

interface BentoDashboardProps {
  onNavigate: (view: "home" | "think-tank" | "exchange" | "chat" | "directory" | "profile" | "admin") => void;
}

export function BentoDashboard({ onNavigate }: BentoDashboardProps) {
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const { user, profile } = useAuth();
  const newsVideoId = "dQw4w9WgXcQ"; // Placeholder video ID
  const newsTitle = "Avances en la Mesa Técnica de Economía: Nuevas Propuestas para la Comunidad";

  return (
    <div className="flex h-screen w-full flex-col bg-brand-bone p-4 overflow-hidden lg:p-8">
      {/* Header Compacto (15%) */}
      <header className="flex h-[15%] items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white shadow-lg shadow-brand-blue/20">
            <span className="text-xl font-black">CM</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/60">Bienvenido,</p>
            <p className="text-lg font-black text-brand-blue leading-none">{profile?.name || "Ciudadano"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {profile?.role === 'super_admin' && (
            <button 
              onClick={() => onNavigate("admin")}
              className="rounded-2xl bg-brand-gold p-3 text-white shadow-lg shadow-brand-gold/20 hover:bg-brand-gold/90 transition-colors"
            >
              <Shield className="h-5 w-5" />
            </button>
          )}
          <button className="rounded-2xl bg-white p-3 text-brand-slate shadow-sm border border-brand-gold/10 hover:text-brand-gold transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="rounded-2xl bg-white p-3 text-brand-slate shadow-sm border border-brand-gold/10 hover:text-brand-gold transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-red animate-pulse"></span>
          </button>
          <button 
            onClick={() => onNavigate("profile")}
            className="rounded-2xl bg-brand-blue p-3 text-white shadow-lg shadow-brand-blue/20"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Bento Grid (75%) */}
      <div className="grid flex-grow grid-cols-2 grid-rows-4 gap-3 md:grid-cols-3 md:grid-rows-3">
        
        {/* Tile 1: Última Noticia (col-span-2) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 row-span-2 relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-sm border border-brand-gold/10 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">Última Noticia</span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-brand-slate/60">
              <TrendingUp className="h-3 w-3" />
              <span>Tendencia</span>
            </div>
          </div>
          
          <div 
            onClick={() => setIsNewsModalOpen(true)}
            className="relative h-[calc(100%-2.5rem)] w-full overflow-hidden rounded-3xl cursor-pointer"
          >
            <img 
              src={`https://img.youtube.com/vi/${newsVideoId}/maxresdefault.jpg`} 
              alt="Noticia" 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
              <h4 className="text-base font-black text-white mb-2 line-clamp-2 leading-tight">{newsTitle}</h4>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-blue shadow-lg backdrop-blur-sm">
                  <Play className="h-5 w-5 fill-current ml-1" />
                </div>
                <span className="text-xs font-bold text-white/90">Ver Informe Completo</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tile 2: Chat Grupal */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => onNavigate("chat")}
          className="relative overflow-hidden rounded-[2.5rem] bg-brand-blue p-5 text-white shadow-xl cursor-pointer group"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-md">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 backdrop-blur-md">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[8px] font-bold uppercase tracking-wider">12 Activos</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-bone/40 uppercase tracking-widest mb-1">Comunidad</p>
              <h4 className="text-lg font-black leading-tight">Chat Interno</h4>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-red/20 transition-all group-hover:bg-brand-red/90">
                Entrar
              </button>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/10 blur-2xl" />
        </motion.div>

        {/* Tile 3: Meta Social (Circular Progress) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 shadow-sm border border-brand-gold/10 flex flex-col items-center justify-center gap-2"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-slate/40">Meta Social</p>
          <div className="relative">
            <CircularProgress percentage={75} size={85} strokeWidth={8} color="stroke-brand-gold" />
            <div className="absolute inset-0 flex items-center justify-center scale-75 opacity-30">
              <CircularProgress percentage={40} size={50} strokeWidth={8} color="stroke-brand-red" />
            </div>
          </div>
          <p className="text-[10px] font-bold text-brand-blue text-center leading-tight">Ley de Propiedad<br/>Horizontal</p>
        </motion.div>

        {/* Tile 4: Banco de Horas (Talento) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => onNavigate("exchange")}
          className="relative overflow-hidden rounded-[2.5rem] bg-brand-bone p-5 border border-brand-gold/20 shadow-sm cursor-pointer group"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="rounded-2xl bg-white p-3 shadow-sm text-brand-gold w-fit">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-brand-blue">Banco de Horas</h4>
              <p className="text-[10px] font-medium text-brand-slate/60">Dona tu talento</p>
            </div>
            <ChevronRight className="absolute bottom-5 right-5 h-5 w-5 text-brand-gold/30 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>

        {/* Tile 5: Red de Apoyo (Directory) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => onNavigate("directory")}
          className="relative overflow-hidden rounded-[2.5rem] bg-white p-5 border border-brand-gold/10 shadow-sm cursor-pointer group"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="rounded-2xl bg-brand-bone p-3 text-brand-slate w-fit">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-brand-blue">Red de Apoyo</h4>
              <p className="text-[10px] font-medium text-brand-slate/60">Intercambio real</p>
            </div>
            <ChevronRight className="absolute bottom-5 right-5 h-5 w-5 text-brand-slate/30 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>

        {/* Tile 6: Mesas Técnicas (Think Tank) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => onNavigate("think-tank")}
          className="relative overflow-hidden rounded-[2.5rem] bg-brand-gold/5 p-5 border border-brand-gold/20 shadow-sm cursor-pointer group md:col-span-1"
        >
          <div className="flex h-full flex-col justify-between">
            <div className="rounded-2xl bg-white p-3 shadow-sm text-brand-blue w-fit">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-brand-blue">Mesas Técnicas</h4>
              <p className="text-[10px] font-medium text-brand-slate/60">Propuestas de ley</p>
            </div>
            <ChevronRight className="absolute bottom-5 right-5 h-5 w-5 text-brand-blue/30 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>

      </div>

      {/* Navigation Bar (10%) - Replaced by App.tsx nav but styled here for consistency if needed */}
      <div className="h-[10%] mt-4" />

      <YouTubeModal 
        isOpen={isNewsModalOpen} 
        onClose={() => setIsNewsModalOpen(false)} 
        videoId={newsVideoId} 
        title={newsTitle} 
      />
    </div>
  );
}
