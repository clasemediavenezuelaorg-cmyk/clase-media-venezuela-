import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Trophy, 
  Calendar, 
  Target, 
  MapPin, 
  ChevronRight, 
  Search,
  User,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { cn } from "@/src/lib/utils";

type Tab = "structure" | "achievements" | "assemblies" | "plans";

interface Member {
  id: string;
  name: string;
  role: string;
  level: 'national' | 'state';
  state?: string;
  photo_url?: string;
  bio?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url?: string;
}

interface Assembly {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

interface Plan {
  id: string;
  title: string;
  description: string;
  target_date: string;
  status: string;
}

export function OrganizationModule() {
  const [activeTab, setActiveTab] = useState<Tab>("structure");
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [assemblies, setAssemblies] = useState<Assembly[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "structure") {
        const { data } = await supabase.from('organization_members').select('*').order('order_index');
        setMembers(data || []);
      } else if (activeTab === "achievements") {
        const { data } = await supabase.from('achievements').select('*').order('date', { ascending: false });
        setAchievements(data || []);
      } else if (activeTab === "assemblies") {
        const { data } = await supabase.from('assemblies').select('*').order('date', { ascending: false });
        setAssemblies(data || []);
      } else if (activeTab === "plans") {
        const { data } = await supabase.from('plans').select('*').order('target_date');
        setPlans(data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.state && m.state.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const nationalMembers = filteredMembers.filter(m => m.level === 'national');
  const stateMembers = filteredMembers.filter(m => m.level === 'state');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black text-brand-blue uppercase tracking-tighter">Nuestra Organización</h2>
          <p className="text-brand-slate font-medium">Estructura, logros y visión de Clase Media Venezuela.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab("structure")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === "structure" ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "bg-white text-brand-slate hover:bg-brand-bone"
            )}
          >
            <Users className="h-4 w-4" /> Estructura
          </button>
          <button 
            onClick={() => setActiveTab("achievements")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === "achievements" ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "bg-white text-brand-slate hover:bg-brand-bone"
            )}
          >
            <Trophy className="h-4 w-4" /> Logros
          </button>
          <button 
            onClick={() => setActiveTab("assemblies")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === "assemblies" ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "bg-white text-brand-slate hover:bg-brand-bone"
            )}
          >
            <Calendar className="h-4 w-4" /> Asambleas
          </button>
          <button 
            onClick={() => setActiveTab("plans")}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === "plans" ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "bg-white text-brand-slate hover:bg-brand-bone"
            )}
          >
            <Target className="h-4 w-4" /> Planes
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-64 items-center justify-center"
          >
            <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {activeTab === "structure" && (
              <div className="space-y-12">
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-slate/40" />
                  <input 
                    type="text"
                    placeholder="Buscar por nombre, cargo o estado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-white py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold shadow-sm"
                  />
                </div>

                {/* National Structure */}
                <section>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-1 w-12 rounded-full bg-brand-gold" />
                    <h3 className="text-xl font-black uppercase tracking-tighter text-brand-blue">Estructura Nacional</h3>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {nationalMembers.map((member) => (
                      <motion.div 
                        key={member.id}
                        whileHover={{ y: -5 }}
                        className="group overflow-hidden rounded-[2rem] bg-white p-4 shadow-xl transition-all hover:shadow-2xl"
                      >
                        <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-brand-bone">
                          {member.photo_url ? (
                            <img 
                              src={member.photo_url} 
                              alt={member.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-brand-slate/20">
                              <User className="h-12 w-12" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-lg font-black text-brand-blue leading-tight">{member.name}</h4>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">{member.role}</p>
                        {member.bio && <p className="mt-2 text-xs text-brand-slate line-clamp-2">{member.bio}</p>}
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* State Directory */}
                <section>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-1 w-12 rounded-full bg-brand-gold" />
                    <h3 className="text-xl font-black uppercase tracking-tighter text-brand-blue">Directorio Estatal</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stateMembers.length > 0 ? stateMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-brand-bone">
                          {member.photo_url ? (
                            <img src={member.photo_url} alt={member.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-brand-slate/20">
                              <User className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-blue">{member.name}</h4>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">{member.role}</p>
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-brand-slate">
                            <MapPin className="h-3 w-3" /> {member.state}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full rounded-2xl border-2 border-dashed border-brand-gold/20 p-8 text-center">
                        <p className="text-brand-slate italic">No se encontraron coordinadores estatales.</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid gap-8 md:grid-cols-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="group overflow-hidden rounded-[2.5rem] bg-white shadow-xl">
                    <div className="relative h-48 overflow-hidden bg-brand-bone">
                      {achievement.image_url ? (
                        <img src={achievement.image_url} alt={achievement.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-brand-slate/20">
                          <ImageIcon className="h-12 w-12" />
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest">
                        {new Date(achievement.date).toLocaleDateString('es-VE', { year: 'numeric', month: 'long' })}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-black text-brand-blue uppercase tracking-tight">{achievement.title}</h3>
                      <p className="text-sm text-brand-slate leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                ))}
                {achievements.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <Trophy className="mx-auto mb-4 h-12 w-12 text-brand-gold/20" />
                    <p className="text-brand-slate italic">Aún no se han registrado logros.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "assemblies" && (
              <div className="space-y-4">
                {assemblies.map((assembly) => (
                  <div key={assembly.id} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg md:flex-row md:items-center">
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-brand-bone p-4 text-center md:w-32">
                      <span className="text-2xl font-black text-brand-blue">{new Date(assembly.date).getDate()}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                        {new Date(assembly.date).toLocaleDateString('es-VE', { month: 'short' })}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-brand-blue uppercase tracking-tight">{assembly.title}</h3>
                      <p className="text-sm text-brand-slate line-clamp-2">{assembly.description}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs text-brand-slate">
                          <MapPin className="h-3 w-3 text-brand-gold" /> {assembly.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-brand-slate">
                          <Calendar className="h-3 w-3 text-brand-gold" /> {new Date(assembly.date).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <button className="rounded-full bg-brand-blue/5 p-3 text-brand-blue hover:bg-brand-blue hover:text-white transition-all">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {assemblies.length === 0 && (
                  <div className="py-12 text-center">
                    <Calendar className="mx-auto mb-4 h-12 w-12 text-brand-gold/20" />
                    <p className="text-brand-slate italic">No hay asambleas programadas.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "plans" && (
              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                  <div key={plan.id} className="flex flex-col rounded-[2rem] border border-brand-gold/10 bg-white p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <div className={cn(
                        "rounded-full px-3 py-1 text-[8px] font-black uppercase tracking-widest",
                        plan.status === 'completed' ? "bg-green-100 text-green-600" : 
                        plan.status === 'in-progress' ? "bg-brand-blue/10 text-brand-blue" : 
                        "bg-brand-bone text-brand-slate"
                      )}>
                        {plan.status === 'completed' ? 'Completado' : plan.status === 'in-progress' ? 'En Progreso' : 'Planificado'}
                      </div>
                      <Target className="h-5 w-5 text-brand-gold/40" />
                    </div>
                    <h3 className="mb-2 text-lg font-black text-brand-blue uppercase tracking-tight leading-none">{plan.title}</h3>
                    <p className="mb-6 flex-1 text-xs text-brand-slate leading-relaxed">{plan.description}</p>
                    <div className="flex items-center justify-between border-t border-brand-gold/5 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-slate/60">Meta:</span>
                      <span className="text-[10px] font-black text-brand-blue">
                        {new Date(plan.target_date).toLocaleDateString('es-VE', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                ))}
                {plans.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <Target className="mx-auto mb-4 h-12 w-12 text-brand-gold/20" />
                    <p className="text-brand-slate italic">No se han publicado planes estratégicos.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
