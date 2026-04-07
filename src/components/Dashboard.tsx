import { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Brain, 
  Handshake, 
  Eye, 
  GraduationCap,
  ChevronRight,
  Plus,
  TrendingUp,
  MessageSquare,
  ShieldAlert,
  Trophy,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ServiceReportForm } from "./ServiceReportForm";
import { AlertModal } from "./AlertModal";
import { SkillRegistrationForm } from "./SkillRegistrationForm";

const services = [
  {
    id: "banco-horas",
    title: "Banco de Horas",
    description: "Dona tu talento profesional",
    icon: Users,
    color: "text-brand-gold",
    bg: "bg-brand-bone",
    border: "border-brand-gold/20",
  },
  {
    id: "think-tank",
    title: "Mesas de Trabajo",
    description: "Debate y propuestas de ley",
    icon: Brain,
    color: "text-brand-blue",
    bg: "bg-brand-bone",
    border: "border-brand-gold/20",
  },
  {
    id: "apoyo-mutuo",
    title: "Red de Apoyo",
    description: "Trueque de servicios",
    icon: Handshake,
    color: "text-brand-slate",
    bg: "bg-brand-bone",
    border: "border-brand-gold/20",
  },
  {
    id: "monitoreo",
    title: "Monitoreo Ciudadano",
    description: "Reporte de incidencias",
    icon: Eye,
    color: "text-brand-red",
    bg: "bg-brand-bone",
    border: "border-brand-gold/20",
  },
];

interface DashboardProps {
  onNavigate: (view: "home" | "think-tank" | "exchange" | "chat" | "directory" | "profile") => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleServiceClick = (id: string) => {
    switch (id) {
      case "banco-horas":
        onNavigate("exchange");
        break;
      case "think-tank":
        onNavigate("think-tank");
        break;
      case "apoyo-mutuo":
        onNavigate("directory");
        break;
      case "monitoreo":
        setIsReportFormOpen(true);
        break;
    }
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-brand-blue p-8 text-white shadow-xl lg:p-12">
        <div className="relative z-10 max-w-2xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Tu intelecto es el motor del cambio.
          </h2>
          <p className="text-brand-bone/80 lg:text-lg">
            Intercambia conocimiento, participa en mesas técnicas y construye soluciones reales para nuestra comunidad.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <button 
              onClick={() => setIsSkillFormOpen(true)}
              className="flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 font-bold text-white transition-all hover:bg-brand-red/90 active:scale-95 shadow-lg shadow-brand-red/20"
            >
              <Plus className="h-5 w-5" />
              Registrar Habilidad
            </button>
            <button 
              onClick={() => setIsReportFormOpen(true)}
              className="flex items-center gap-2 rounded-full border border-brand-gold/30 px-6 py-3 font-bold text-white transition-all hover:bg-white/10"
            >
              <AlertTriangle className="h-5 w-5" />
              Reporte Ciudadano
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl"></div>
      </section>

      <SkillRegistrationForm isOpen={isSkillFormOpen} onClose={() => setIsSkillFormOpen(false)} />
      <ServiceReportForm isOpen={isReportFormOpen} onClose={() => setIsReportFormOpen(false)} />
      <AlertModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} />

      {/* Project Progress Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-brand-blue">Avances del Movimiento</h3>
          <div className="flex items-center gap-2 text-brand-gold">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-bold">Impacto Real</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Propuesta de Ley de Servicios", percentage: 75, desc: "Redacción final en mesa técnica" },
            { title: "Plan de Bacheo Comunitario", percentage: 40, desc: "Recolección de datos GPS en curso" }
          ].map((project, i) => (
            <div key={i} className="rounded-3xl border border-brand-gold/10 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-bold text-brand-blue">{project.title}</h4>
                <span className="text-sm font-black text-brand-gold">{project.percentage}%</span>
              </div>
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-brand-bone">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-brand-gold"
                />
              </div>
              <p className="text-xs font-medium text-brand-slate">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-brand-blue">Ejes de Acción</h3>
          <button className="text-sm font-bold text-brand-gold hover:underline">Explorar todos</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleServiceClick(service.id)}
              className={cn(
                "group relative flex flex-col items-start gap-4 rounded-3xl border p-6 text-left transition-all hover:shadow-lg hover:border-brand-gold/40",
                service.bg,
                service.border
              )}
            >
              <div className={cn("rounded-2xl bg-white p-3 shadow-sm", service.color)}>
                <service.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-brand-blue">{service.title}</h4>
                <p className="text-xs font-medium text-brand-slate">{service.description}</p>
              </div>
              <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-brand-gold/50 transition-transform group-hover:translate-x-1" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Two Column Layout for Participation and Training */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Think Tank Section */}
        <section className="space-y-4 rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-brand-gold/10 p-2 text-brand-gold">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-brand-blue">Mesas Técnicas Activas</h3>
          </div>
          <div className="space-y-4">
            {[
              { title: "Comisión de Economía", members: 12, topics: 5 },
              { title: "Mesa de Educación", members: 8, topics: 3 }
            ].map((mesa, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-brand-bone p-4 border border-brand-gold/5">
                <div>
                  <p className="font-bold text-brand-blue">{mesa.title}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-slate/60">
                    {mesa.members} Expertos • {mesa.topics} Propuestas
                  </p>
                </div>
                <button className="rounded-xl bg-white p-2 text-brand-blue shadow-sm hover:text-brand-gold transition-colors">
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button className="w-full rounded-xl border border-brand-gold/20 py-3 text-sm font-bold text-brand-blue hover:bg-brand-bone transition-all">
              Ver Wiki de Propuestas
            </button>
          </div>
        </section>

        {/* Training Section */}
        <section className="space-y-4 rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-brand-blue/10 p-2 text-brand-blue">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-brand-blue">Formación Ciudadana</h3>
          </div>
          <div className="space-y-4">
            <div className="group relative overflow-hidden rounded-2xl bg-brand-blue p-6 text-white">
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-bone/60">Próximo Curso</p>
                <h4 className="text-lg font-bold">Liderazgo y Derechos Civiles</h4>
                <p className="mt-2 text-xs text-brand-bone/80">Dictado por: Abog. Luis Méndez</p>
                <button className="mt-4 rounded-xl bg-brand-gold px-4 py-2 text-xs font-bold text-white shadow-lg shadow-brand-gold/20">
                  Inscribirme Gratis
                </button>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-brand-gold/10 p-3 text-sm">
              <span className="font-medium text-brand-slate">Networking: Sector Ingeniería</span>
              <span className="font-bold text-brand-gold">Jueves 18:00</span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <button 
          onClick={() => setIsAlertModalOpen(true)}
          className="flex items-center justify-between rounded-3xl bg-brand-red/5 border border-brand-red/10 p-6 text-left transition-all hover:bg-brand-red/10"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-brand-red p-3 text-white shadow-lg shadow-brand-red/20">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-brand-red">Alerta Vecinal</h4>
              <p className="text-xs font-medium text-brand-red/70">Emergencias médicas o seguridad</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-brand-red/40" />
        </button>

        <button className="flex items-center justify-between rounded-3xl bg-brand-gold/5 border border-brand-gold/10 p-6 text-left transition-all hover:bg-brand-gold/10">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-brand-gold p-3 text-white shadow-lg shadow-brand-gold/20">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-brand-gold">Puntos Comunitarios</h4>
              <p className="text-xs font-medium text-brand-gold/70">Canjea tus puntos por beneficios</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-brand-gold/40" />
        </button>
      </div>
    </div>
  );
}


