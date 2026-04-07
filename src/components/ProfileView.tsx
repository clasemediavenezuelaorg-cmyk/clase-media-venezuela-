import { motion } from "motion/react";
import { User, Phone, Shield, LogOut, Briefcase, Award, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface ProfileViewProps {
  onNavigate: (view: "home" | "think-tank" | "exchange" | "chat" | "directory" | "profile" | "admin") => void;
}

export function ProfileView({ onNavigate }: ProfileViewProps) {
  const { profile, signOut } = useAuth();

  if (!profile) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center p-8">
        <div className="rounded-full bg-brand-bone p-6 mb-4">
          <User className="h-12 w-12 text-brand-slate/20" />
        </div>
        <h2 className="text-2xl font-black text-brand-blue">Inicia Sesión</h2>
        <p className="text-brand-slate mt-2">Regístrate para ver tu perfil y participar en el chat.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Profile Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-brand-blue p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-[2rem] bg-white flex items-center justify-center text-brand-blue text-4xl font-black shadow-2xl mb-4">
            {profile.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-black">{profile.name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
              {profile.role === 'super_admin' ? 'Super Administrador' : profile.role === 'admin' ? `Admin: ${profile.department}` : 'Ciudadano'}
            </span>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-gold/10 blur-2xl" />
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-brand-gold/10 flex flex-col items-center">
          <Star className="h-6 w-6 text-brand-gold mb-2" />
          <span className="text-2xl font-black text-brand-blue">120</span>
          <span className="text-[10px] font-bold text-brand-slate uppercase tracking-widest">Puntos</span>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-brand-gold/10 flex flex-col items-center">
          <Award className="h-6 w-6 text-brand-red mb-2" />
          <span className="text-2xl font-black text-brand-blue">3</span>
          <span className="text-[10px] font-bold text-brand-slate uppercase tracking-widest">Medallas</span>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-brand-gold/10 space-y-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-brand-bone p-3 text-brand-blue">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-brand-slate uppercase tracking-widest">Teléfono</p>
            <p className="font-bold text-brand-blue">{profile.phone}</p>
          </div>
        </div>

        {profile.role === 'super_admin' && (
          <button 
            onClick={() => onNavigate("admin")}
            className="flex w-full items-center justify-between rounded-2xl bg-brand-gold/10 p-4 text-brand-gold transition-all hover:bg-brand-gold/20"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5" />
              <span className="font-bold">Panel de Administración</span>
            </div>
            <Award className="h-4 w-4" />
          </button>
        )}

        <button 
          onClick={signOut}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red/5 py-4 font-bold text-brand-red transition-all hover:bg-brand-red/10"
        >
          <LogOut className="h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
