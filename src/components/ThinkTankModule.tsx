import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Plus, 
  Search, 
  ThumbsUp, 
  MessageSquare, 
  ChevronRight,
  BookOpen,
  Users,
  Clock,
  CheckCircle2,
  Edit3
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Proposal } from "../types";

const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: "1",
    title: "Ley de Estímulo al Talento Nacional",
    description: "Propuesta para incentivar la contratación de profesionales locales en proyectos de infraestructura.",
    authorId: "user-1",
    category: "Economía",
    status: "under-review",
    votes: 156,
    content: "# Ley de Estímulo al Talento Nacional\n\nEsta propuesta busca crear un marco legal que favorezca la contratación de profesionales venezolanos...",
  },
  {
    id: "2",
    title: "Plan de Digitalización de Servicios Públicos",
    description: "Estrategia para modernizar la gestión de servicios mediante tecnologías blockchain.",
    authorId: "user-2",
    category: "Tecnología",
    status: "draft",
    votes: 89,
    content: "# Plan de Digitalización\n\nEl objetivo es eliminar la burocracia mediante el uso de contratos inteligentes...",
  }
];

export function ThinkTankModule() {
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [activeTab, setActiveTab] = useState<"wiki" | "commissions">("wiki");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProposals = proposals.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-blue">Think Tank Ciudadano</h2>
          <p className="text-brand-slate">Construyendo soluciones desde el intelecto y el debate técnico.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-brand-bone p-1 border border-brand-gold/10">
          <button
            onClick={() => setActiveTab("wiki")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
              activeTab === "wiki" ? "bg-brand-blue text-white shadow-md" : "text-brand-slate hover:bg-brand-gold/10"
            )}
          >
            <BookOpen className="h-4 w-4" />
            Wiki de Propuestas
          </button>
          <button
            onClick={() => setActiveTab("commissions")}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
              activeTab === "commissions" ? "bg-brand-blue text-white shadow-md" : "text-brand-slate hover:bg-brand-gold/10"
            )}
          >
            <Users className="h-4 w-4" />
            Comisiones Técnicas
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "wiki" ? (
          <motion.div
            key="wiki"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Search and Add */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-slate/40" />
                <input
                  type="text"
                  placeholder="Buscar propuestas por título o categoría..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-brand-gold/10 bg-white py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-8 py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 active:scale-95">
                <Plus className="h-5 w-5" />
                Nueva Propuesta
              </button>
            </div>

            {/* Proposals Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProposals.map((proposal) => (
                <motion.div
                  key={proposal.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-brand-gold/40"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                      {proposal.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {proposal.status === "approved" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : proposal.status === "under-review" ? (
                        <Clock className="h-4 w-4 text-brand-gold" />
                      ) : (
                        <Edit3 className="h-4 w-4 text-brand-slate/40" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate/60">
                        {proposal.status === "approved" ? "Aprobado" : proposal.status === "under-review" ? "En Revisión" : "Borrador"}
                      </span>
                    </div>
                  </div>

                  <h4 className="mb-2 text-xl font-bold text-brand-blue">{proposal.title}</h4>
                  <p className="mb-6 text-sm font-medium text-brand-slate line-clamp-2">
                    {proposal.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-brand-gold/10">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-brand-slate hover:text-brand-gold transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-xs font-bold">{proposal.votes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-brand-slate hover:text-brand-blue transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs font-bold">12</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-gold transition-colors">
                      Leer más
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="commissions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              { name: "Economía y Finanzas", icon: ThumbsUp, members: 24, active: true },
              { name: "Educación y Cultura", icon: BookOpen, members: 18, active: true },
              { name: "Infraestructura", icon: FileText, members: 15, active: false },
              { name: "Salud Pública", icon: Users, members: 21, active: true },
              { name: "Leyes y Justicia", icon: CheckCircle2, members: 30, active: true },
            ].map((comm, i) => (
              <button
                key={i}
                className="group flex flex-col items-start gap-4 rounded-[2rem] border border-brand-gold/10 bg-white p-8 text-left transition-all hover:shadow-lg hover:border-brand-gold/40"
              >
                <div className="rounded-2xl bg-brand-bone p-4 text-brand-blue shadow-inner group-hover:bg-brand-blue group-hover:text-white transition-all">
                  <comm.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue">{comm.name}</h4>
                  <p className="text-xs font-medium text-brand-slate">{comm.members} Miembros Activos</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn(
                    "h-2 w-2 rounded-full",
                    comm.active ? "bg-emerald-500 animate-pulse" : "bg-brand-slate/20"
                  )} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/60">
                    {comm.active ? "Sesión en curso" : "Inactiva"}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
