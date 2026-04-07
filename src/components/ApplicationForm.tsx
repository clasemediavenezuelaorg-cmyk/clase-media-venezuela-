import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2, UserCheck, MessageSquare, Briefcase, Phone } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  needTitle: string;
  needId: string;
}

export function ApplicationForm({ isOpen, onClose, needTitle, needId }: ApplicationFormProps) {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [skills, setSkills] = useState("");
  const [phone, setPhone] = useState(profile?.phone || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivation || !skills || !phone) return;

    setLoading(true);
    try {
      // Save to DB for tracking
      const { error } = await supabase.from('applications').insert({
        need_id: needId,
        motivation,
        skills_offered: skills,
        status: 'pending'
      });

      if (error) throw error;

      // Send WhatsApp message
      const message = `🤝 *Nueva Postulación: ${needTitle}*\n\n👤 *Nombre:* ${profile?.name || 'Ciudadano'}\n📞 *Teléfono:* ${phone}\n💡 *Motivación:* ${motivation}\n🛠️ *Habilidades:* ${skills}\n\n¡Espero podamos colaborar! ✨🇻🇪`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');

      onClose();
    } catch (error: any) {
      console.error("Error saving application:", error);
      alert(error.message || "Error al enviar la postulación. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
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
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue">Postularme a: {needTitle}</h3>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-bone transition-colors">
                <X className="h-5 w-5 text-brand-slate" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Tu Teléfono de Contacto</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="tel"
                    placeholder="Ej: 04121234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">¿Por qué eres el candidato ideal?</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-brand-slate/40" />
                  <textarea
                    placeholder="Describe tu experiencia relevante para esta necesidad..."
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="min-h-[120px] w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Habilidades que aportarás</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: Redacción legal, Auditoría..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-brand-gold/5 p-4 border border-brand-gold/10">
                <p className="text-[10px] font-medium text-brand-slate leading-relaxed">
                  Tu postulación será enviada por WhatsApp y guardada en el sistema para seguimiento. 🚀
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 disabled:opacity-50 active:scale-95"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-5 w-5" /> Enviar por WhatsApp</>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
