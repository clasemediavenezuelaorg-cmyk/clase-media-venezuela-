import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Brain, Send, Loader2, Award, Briefcase } from "lucide-react";

interface SkillRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SkillRegistrationForm({ isOpen, onClose }: SkillRegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profession || skills.length === 0) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-brand-gold/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-brand-blue/10 p-2 text-brand-blue">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue">Registrar Habilidad</h3>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-bone transition-colors">
                <X className="h-5 w-5 text-brand-slate" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Profesión / Especialidad</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: Abogado, Ingeniero, Logística..."
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Habilidades Técnicas</label>
                <div className="relative">
                  <Award className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Escribe y presiona Enter..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="flex items-center gap-1 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue border border-brand-blue/20"
                    >
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-[10px] text-brand-slate/60 italic">Agrega al menos una habilidad para el Banco de Horas.</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Disponibilidad (Opcional)</label>
                <textarea
                  placeholder="Ej: Fines de semana, tardes después de las 6pm..."
                  className="min-h-[80px] w-full rounded-2xl border border-brand-gold/20 bg-brand-bone p-4 text-sm font-medium text-brand-blue placeholder:text-brand-slate/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
              </div>

              <div className="rounded-2xl bg-brand-gold/5 p-4 border border-brand-gold/10">
                <p className="text-[10px] font-medium text-brand-slate leading-relaxed">
                  Al registrarte en el <span className="font-bold text-brand-blue">Banco de Horas</span>, te comprometes a donar tu talento profesional de forma voluntaria para el crecimiento de nuestra comunidad.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !profession || skills.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Registrar en Banco de Horas
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
