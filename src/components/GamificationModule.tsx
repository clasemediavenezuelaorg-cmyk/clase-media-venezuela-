import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Calendar, 
  Gift, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Store,
  QrCode,
  History,
  Info,
  CreditCard
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const activities = [
  {
    id: "1",
    title: "Jornada de Limpieza Parque Central",
    description: "Únete a nosotros para limpiar y embellecer nuestro parque principal.",
    points: 150,
    date: "2026-04-05",
    location: "Parque Central",
    participants: 12,
    maxParticipants: 30,
    status: "upcoming"
  },
  {
    id: "2",
    title: "Mantenimiento de Alumbrado Vía 4",
    description: "Ayuda técnica para el cambio de luminarias en la calle 4.",
    points: 200,
    date: "2026-04-07",
    location: "Calle 4",
    participants: 4,
    maxParticipants: 10,
    status: "upcoming"
  }
];

const rewards = [
  {
    id: "r1",
    merchantName: "Panadería La Vecina",
    title: "10% Descuento en Pan de Masa Madre",
    description: "Válido para compras mayores a $10.",
    pointsCost: 500,
    category: "Comida",
    image: "https://picsum.photos/seed/bread/400/200"
  },
  {
    id: "r2",
    merchantName: "Soporte Técnico JP",
    title: "Limpieza de Laptop Gratis",
    description: "Mantenimiento preventivo completo.",
    pointsCost: 1200,
    category: "Servicios",
    image: "https://picsum.photos/seed/laptop/400/200"
  }
];

export function GamificationModule() {
  const [activeTab, setActiveTab] = useState<"user" | "merchant">("user");
  const [subTab, setSubTab] = useState<"activities" | "rewards" | "history">("activities");
  const [points, setPoints] = useState(850);

  return (
    <div className="space-y-8">
      {/* Header & Role Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-blue">Impacto Comunitario</h2>
          <p className="text-brand-slate">Gana puntos ayudando y canjéalos en tu comunidad.</p>
        </div>
        <div className="flex rounded-2xl bg-brand-bone p-1 border border-brand-gold/10">
          <button
            onClick={() => setActiveTab("user")}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-bold transition-all",
              activeTab === "user" ? "bg-white text-brand-blue shadow-sm" : "text-brand-slate hover:text-brand-blue"
            )}
          >
            Vecino
          </button>
          <button
            onClick={() => setActiveTab("merchant")}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-bold transition-all",
              activeTab === "merchant" ? "bg-white text-brand-blue shadow-sm" : "text-brand-slate hover:text-brand-blue"
            )}
          >
            Comercio
          </button>
        </div>
      </div>

      {activeTab === "user" ? (
        <div className="space-y-8">
          {/* Points Summary Card */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-blue to-brand-slate p-8 text-white shadow-xl">
            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-xs font-bold text-brand-bone/60 uppercase tracking-wider">Tus Puntos Acumulados</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{points.toLocaleString()}</span>
                  <Trophy className="h-6 w-6 text-brand-gold" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-brand-bone/60">Nivel</p>
                  <p className="text-lg font-bold">Vecino Activo</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-brand-bone/60">Próximo Rango</p>
                  <p className="text-lg font-bold">Líder Comunitario</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-gold/10 blur-3xl"></div>
          </div>

          {/* User Navigation */}
          <div className="flex border-b border-brand-gold/10">
            {[
              { id: "activities", label: "Voluntariado", icon: Users },
              { id: "rewards", label: "Recompensas", icon: Gift },
              { id: "history", label: "Historial", icon: History },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-bold transition-all",
                  subTab === tab.id
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-brand-slate hover:text-brand-blue"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {subTab === "activities" && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {activities.map((activity) => (
                  <div key={activity.id} className="group rounded-3xl border border-brand-gold/10 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-gold/30">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-2xl bg-brand-bone p-3 text-brand-blue">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-bold text-brand-gold">
                        +{activity.points} pts
                      </div>
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-brand-blue">{activity.title}</h4>
                    <p className="mb-4 text-sm text-brand-slate line-clamp-2">{activity.description}</p>
                    <div className="mb-6 flex items-center gap-4 text-xs text-brand-slate/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {activity.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {activity.participants}/{activity.maxParticipants} inscritos
                      </div>
                    </div>
                    <button className="w-full rounded-2xl bg-brand-blue py-3 font-bold text-white transition-all hover:bg-brand-blue/90 active:scale-95">
                      Unirme a la Jornada
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {subTab === "rewards" && (
              <motion.div
                key="rewards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {rewards.map((reward) => (
                  <div key={reward.id} className="group overflow-hidden rounded-3xl border border-brand-gold/10 bg-white shadow-sm transition-all hover:shadow-md hover:border-brand-gold/30">
                    <div className="relative h-32 w-full overflow-hidden">
                      <img src={reward.image} alt={reward.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent" />
                      <div className="absolute bottom-3 left-4 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{reward.merchantName}</p>
                        <p className="text-sm font-bold">{reward.category}</p>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="font-bold text-brand-blue">{reward.title}</h4>
                        <p className="text-xs font-medium text-brand-slate">{reward.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-brand-gold">
                          <Trophy className="h-4 w-4" />
                          <span className="text-sm font-bold">{reward.pointsCost} pts</span>
                        </div>
                        <button 
                          disabled={points < reward.pointsCost}
                          className={cn(
                            "rounded-xl px-4 py-2 text-xs font-bold transition-all active:scale-95",
                            points >= reward.pointsCost 
                              ? "bg-brand-red text-white hover:bg-brand-red/90 shadow-lg shadow-brand-red/20" 
                              : "bg-brand-bone text-brand-slate/40 cursor-not-allowed"
                          )}
                        >
                          Canjear
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {subTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {[
                  { id: "h1", type: "earn", amount: 150, desc: "Participación en Jornada de Limpieza", date: "2026-03-20" },
                  { id: "h2", type: "spend", amount: 500, desc: "Canje: Descuento Panadería La Vecina", date: "2026-03-15" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl border border-brand-gold/5 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "rounded-full p-2",
                        item.type === "earn" ? "bg-brand-gold/10 text-brand-gold" : "bg-brand-red/10 text-brand-red"
                      )}>
                        {item.type === "earn" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-brand-blue">{item.desc}</p>
                        <p className="text-xs font-medium text-brand-slate">{item.date}</p>
                      </div>
                    </div>
                    <p className={cn("font-black", item.type === "earn" ? "text-brand-gold" : "text-brand-red")}>
                      {item.type === "earn" ? "+" : "-"}{item.amount}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Merchant Management View */
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-brand-gold/10 bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-bone text-brand-blue">
                <Store className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-blue">Tus Recompensas</h3>
              <p className="mb-6 text-sm text-brand-slate">Gestiona los beneficios que ofreces a la comunidad.</p>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red py-3 font-bold text-white transition-all hover:bg-brand-red/90 shadow-lg shadow-brand-red/20">
                <Plus className="h-4 w-4" />
                Crear Oferta
              </button>
            </div>

            <div className="lg:col-span-2 rounded-3xl border border-brand-gold/10 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-brand-blue">Validar Canje</h3>
                <div className="rounded-full bg-brand-gold/10 p-2 text-brand-gold">
                  <QrCode className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center">
                <div className="relative h-48 w-48 rounded-3xl border-2 border-dashed border-brand-gold/20 bg-brand-bone flex items-center justify-center">
                  <QrCode className="h-24 w-24 text-brand-gold/20" />
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-brand-red p-2 text-white shadow-lg">
                    <Plus className="h-4 w-4" />
                  </div>
                </div>
                <div className="max-w-xs space-y-2">
                  <p className="font-bold text-brand-blue">Escanear Código QR</p>
                  <p className="text-sm text-brand-slate">Escanea el código del vecino para validar su cupón y descontar los puntos.</p>
                </div>
                <div className="w-full max-w-sm space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="O ingresa el código manual..." 
                      className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone px-4 py-3 text-sm focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <button className="w-full rounded-2xl bg-brand-blue py-3 font-bold text-white transition-all hover:bg-brand-blue/90">
                    Validar Código
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Merchant Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Canjes Totales", value: "124", icon: CheckCircle2, color: "text-brand-gold", bg: "bg-brand-gold/10" },
              { label: "Puntos Recibidos", value: "15.4k", icon: Trophy, color: "text-brand-blue", bg: "bg-brand-blue/10" },
              { label: "Nuevos Clientes", value: "42", icon: Users, color: "text-brand-slate", bg: "bg-brand-bone" },
              { label: "Ahorro Vecinal", value: "$1,240", icon: CreditCard, color: "text-brand-red", bg: "bg-brand-red/10" },
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl border border-brand-gold/10 bg-white p-6 shadow-sm">
                <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-xl", stat.bg, stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="text-[10px] font-bold text-brand-slate uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-brand-blue">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
