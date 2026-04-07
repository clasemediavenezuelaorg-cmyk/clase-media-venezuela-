import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Plus, 
  Search, 
  Award, 
  GraduationCap, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  Star,
  BookOpen,
  UserCheck
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { TalentNeed, Course, UserProfile } from "../types";
import { SkillRegistrationForm } from "./SkillRegistrationForm";
import { TalentRequestForm } from "./TalentRequestForm";
import { ApplicationForm } from "./ApplicationForm";

const INITIAL_NEEDS: TalentNeed[] = [
  {
    id: "1",
    title: "Asesoría Legal para Condominio",
    description: "Necesitamos un abogado para revisar los estatutos del edificio y proponer mejoras.",
    requiredSkills: ["Derecho Civil", "Leyes Laborales"],
    status: "open",
    createdAt: Date.now() - 2000000,
  },
  {
    id: "2",
    title: "Diseño de Marca Social",
    description: "Buscamos un diseñador gráfico para crear la identidad visual de nuestra nueva mesa técnica.",
    requiredSkills: ["Diseño Gráfico", "Branding"],
    status: "in-progress",
    createdAt: Date.now() - 1000000,
  }
];

const INITIAL_COURSES: Course[] = [
  {
    id: "1",
    title: "Liderazgo Ciudadano",
    instructor: "Abog. Luis Méndez",
    description: "Módulo de formación sobre derechos, deberes y liderazgo comunitario.",
    duration: "12 horas",
    thumbnail: "https://picsum.photos/seed/leadership/400/225",
    category: "Derechos",
  },
  {
    id: "2",
    title: "Gestión de Proyectos Sociales",
    instructor: "Ing. Maria Garcia",
    description: "Aprende a estructurar y ejecutar proyectos de impacto comunitario.",
    duration: "8 horas",
    thumbnail: "https://picsum.photos/seed/project/400/225",
    category: "Gestión",
  }
];

const CURRENT_USER: UserProfile = {
  id: "me",
  name: "Tú",
  profession: "Ingeniero de Software",
  skills: ["React", "TypeScript", "Node.js"],
  points: 450,
  medals: ["Fundador", "Experto Técnico"],
  isVerified: true,
};

export function KnowledgeExchangeModule() {
  const [activeTab, setActiveTab] = useState<"banco" | "formacion" | "perfil">("banco");
  const [needs, setNeeds] = useState<TalentNeed[]>(INITIAL_NEEDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [selectedNeed, setSelectedNeed] = useState<TalentNeed | null>(null);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <SkillRegistrationForm isOpen={isSkillFormOpen} onClose={() => setIsSkillFormOpen(false)} />
      <TalentRequestForm isOpen={isRequestFormOpen} onClose={() => setIsRequestFormOpen(false)} />
      <ApplicationForm 
        isOpen={isApplicationFormOpen} 
        onClose={() => { setIsApplicationFormOpen(false); setSelectedNeed(null); }} 
        needTitle={selectedNeed?.title || ""} 
      />
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-blue">Intercambio de Capital Humano</h2>
          <p className="text-brand-slate">Donde el conocimiento es la moneda de cambio.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-brand-bone p-1 border border-brand-gold/10">
          {[
            { id: "banco", label: "Banco de Horas", icon: Users },
            { id: "formacion", label: "Formación", icon: GraduationCap },
            { id: "perfil", label: "Mi Perfil", icon: UserCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
                activeTab === tab.id ? "bg-brand-blue text-white shadow-md" : "text-brand-slate hover:bg-brand-gold/10"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "banco" ? (
          <motion.div
            key="banco"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Stats and Search */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[2rem] bg-brand-blue p-6 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-bone/60">Horas Donadas</p>
                <p className="text-3xl font-black">1,240h</p>
                <p className="mt-2 text-xs text-brand-bone/80">Este mes por la comunidad</p>
              </div>
              <div className="rounded-[2rem] bg-brand-gold p-6 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-bone/60">Expertos Activos</p>
                <p className="text-3xl font-black">85</p>
                <p className="mt-2 text-xs text-brand-bone/80">En 12 áreas profesionales</p>
              </div>
              <div className="rounded-[2rem] bg-brand-slate p-6 text-white shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-bone/60">Impacto Social</p>
                <p className="text-3xl font-black">92%</p>
                <p className="mt-2 text-xs text-brand-bone/80">De necesidades resueltas</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-slate/40" />
                <input
                  type="text"
                  placeholder="Buscar necesidades por habilidad o título..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-brand-gold/10 bg-white py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>
              <button 
                onClick={() => setIsRequestFormOpen(true)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-8 py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 active:scale-95"
              >
                <Plus className="h-5 w-5" />
                Solicitar Talento
              </button>
            </div>

            {/* Needs List */}
            <div className="space-y-4">
              {needs.map((need) => (
                <motion.div
                  key={need.id}
                  className="flex flex-col gap-6 rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-brand-gold/40 md:flex-row md:items-center"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-bold text-brand-blue">{need.title}</h4>
                      <span className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                        need.status === "open" ? "bg-emerald-100 text-emerald-600" : "bg-brand-gold/10 text-brand-gold"
                      )}>
                        {need.status === "open" ? "Abierto" : "En Proceso"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-brand-slate">{need.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {need.requiredSkills.map((skill, i) => (
                        <span key={i} className="rounded-lg bg-brand-bone px-2 py-1 text-[10px] font-bold text-brand-blue border border-brand-gold/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 border-t border-brand-gold/10 pt-6 md:border-none md:pt-0">
                    <div className="flex flex-col items-end">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/40">Publicado</p>
                      <p className="text-xs font-bold text-brand-blue">Hace 2 días</p>
                    </div>
                    <button 
                      onClick={() => { setSelectedNeed(need); setIsApplicationFormOpen(true); }}
                      className="rounded-2xl bg-brand-blue px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:bg-brand-blue/90 active:scale-95"
                    >
                      Postularme
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : activeTab === "formacion" ? (
          <motion.div
            key="formacion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {INITIAL_COURSES.map((course) => (
              <div key={course.id} className="group overflow-hidden rounded-[2.5rem] border border-brand-gold/10 bg-white shadow-sm transition-all hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-xl font-bold text-brand-blue">{course.title}</h4>
                    <div className="flex items-center gap-1 text-brand-gold">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-bold">{course.duration}</span>
                    </div>
                  </div>
                  <p className="mb-6 text-sm font-medium text-brand-slate">{course.description}</p>
                  <div className="flex items-center justify-between border-t border-brand-gold/10 pt-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-brand-bone border border-brand-gold/10" />
                      <span className="text-xs font-bold text-brand-blue">{course.instructor}</span>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-gold transition-colors">
                      Ver Módulos
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="perfil"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {/* User Info Card */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-[2.5rem] border border-brand-gold/10 bg-white p-10 shadow-sm">
                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-brand-bone border-4 border-brand-gold/20 shadow-inner" />
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-brand-gold p-2 text-white shadow-lg">
                      <UserCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl font-black text-brand-blue">{CURRENT_USER.name}</h3>
                      <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue">
                        {CURRENT_USER.profession}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {CURRENT_USER.skills.map((skill, i) => (
                        <span key={i} className="rounded-lg bg-brand-bone px-2 py-1 text-xs font-bold text-brand-slate border border-brand-gold/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Medals and Achievements */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <Award className="h-5 w-5 text-brand-gold" />
                    <h4 className="font-bold text-brand-blue">Medallas de Prestigio</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {CURRENT_USER.medals.map((medal, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 rounded-2xl bg-brand-bone p-4 text-center border border-brand-gold/5">
                        <div className="rounded-full bg-white p-3 text-brand-gold shadow-sm">
                          <Star className="h-6 w-6 fill-brand-gold" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{medal}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm">
                  <div className="mb-6 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <h4 className="font-bold text-brand-blue">Impacto Generado</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-brand-slate">Horas Donadas</span>
                      <span className="text-sm font-bold text-brand-blue">45h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-brand-slate">Proyectos Resueltos</span>
                      <span className="text-sm font-bold text-brand-blue">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-brand-slate">Puntos de Prestigio</span>
                      <span className="text-sm font-bold text-brand-gold">{CURRENT_USER.points}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Actions */}
            <div className="space-y-6">
              <div className="rounded-[2rem] bg-brand-blue p-8 text-white shadow-lg">
                <h4 className="mb-4 text-xl font-bold">¿Listo para aportar?</h4>
                <p className="mb-6 text-sm text-brand-bone/80">
                  Tu conocimiento es vital para el crecimiento de nuestra comunidad.
                </p>
                <button 
                  onClick={() => setIsSkillFormOpen(true)}
                  className="w-full rounded-2xl bg-brand-red py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 active:scale-95"
                >
                  Actualizar Habilidades
                </button>
              </div>
              <div className="rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm">
                <h4 className="mb-4 font-bold text-brand-blue">Sugerencias para ti</h4>
                <div className="space-y-4">
                  <div className="rounded-xl bg-brand-bone p-4 border border-brand-gold/5">
                    <p className="text-xs font-bold text-brand-blue">Mesa Técnica: Tecnología</p>
                    <p className="mt-1 text-[10px] text-brand-slate">3 nuevas propuestas necesitan tu revisión.</p>
                  </div>
                  <div className="rounded-xl bg-brand-bone p-4 border border-brand-gold/5">
                    <p className="text-xs font-bold text-brand-blue">Curso: Ciberseguridad</p>
                    <p className="mt-1 text-[10px] text-brand-slate">Basado en tu perfil de Ingeniero.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
