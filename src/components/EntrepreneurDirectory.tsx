import { useState } from "react";
import { motion } from "motion/react";
import { 
  Handshake, 
  Search, 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Repeat
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const categories = ["Todos", "Asesoría", "Diseño", "Logística", "Educación", "Salud"];

const members = [
  {
    id: 1,
    name: "Carlos Ruiz",
    profession: "Contador Público",
    offer: "Asesoría contable y tributaria",
    need: "Diseño de logo para mi firma",
    rating: 4.9,
    verified: true,
    category: "Asesoría",
  },
  {
    id: 2,
    name: "Elena Blanco",
    profession: "Diseñadora Gráfica",
    offer: "Diseño de identidad visual y RRSS",
    need: "Clases de inglés para mi hijo",
    rating: 4.8,
    verified: true,
    category: "Diseño",
  },
  {
    id: 3,
    name: "Marcos Vivas",
    profession: "Profesor de Idiomas",
    offer: "Clases de Inglés y Francés",
    need: "Mantenimiento de mi laptop",
    rating: 5.0,
    verified: false,
    category: "Educación",
  }
];

export function EntrepreneurDirectory() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(m => {
    const matchesCategory = activeCategory === "Todos" || m.category === activeCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.offer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-blue">Red de Apoyo Mutuo</h2>
          <p className="text-brand-slate">Intercambio de servicios y economía colaborativa entre miembros.</p>
        </div>
        <button className="rounded-2xl bg-brand-red px-6 py-3 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 active:scale-95">
          Ofrecer mi Servicio
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-slate/40" />
          <input
            type="text"
            placeholder="¿Qué servicio buscas hoy?..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-brand-gold/10 bg-white py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all",
                activeCategory === cat
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-brand-slate border border-brand-gold/10 hover:border-brand-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group flex flex-col rounded-[2rem] border border-brand-gold/10 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-brand-gold/40"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-brand-bone border border-brand-gold/10 shadow-inner" />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-brand-blue">{member.name}</h4>
                    {member.verified && <CheckCircle2 className="h-3 w-3 text-brand-gold fill-brand-gold/10" />}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-slate/60">{member.profession}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-brand-gold/10 px-2 py-1 text-brand-gold">
                <Star className="h-3 w-3 fill-brand-gold" />
                <span className="text-[10px] font-bold">{member.rating}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-brand-bone p-4 border border-brand-gold/5">
                <div className="flex items-center gap-2 mb-1">
                  <Handshake className="h-3 w-3 text-brand-blue" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Ofrece</span>
                </div>
                <p className="text-xs font-bold text-brand-blue">{member.offer}</p>
              </div>

              <div className="rounded-2xl bg-brand-gold/5 p-4 border border-brand-gold/10">
                <div className="flex items-center gap-2 mb-1">
                  <Repeat className="h-3 w-3 text-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/60">Busca a cambio</span>
                </div>
                <p className="text-xs font-bold text-brand-gold">{member.need}</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button className="flex-1 rounded-xl bg-brand-blue py-3 text-xs font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:bg-brand-blue/90">
                Proponer Trueque
              </button>
              <button className="rounded-xl bg-brand-bone p-3 text-brand-blue border border-brand-gold/10 hover:bg-brand-gold/10 transition-all">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

