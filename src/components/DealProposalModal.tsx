import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2, Handshake, MessageSquare, Repeat, Phone } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

interface DealProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  memberId: string;
}

export function DealProposalModal({ isOpen, onClose, memberName, memberId }: DealProposalModalProps) {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState("");
  const [exchange, setExchange] = useState("");
  const [phone, setPhone] = useState(profile?.phone || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposal || !exchange || !phone) return;

    setLoading(true);
    try {
      // Save to DB for tracking
      const { error } = await supabase.from('deals').insert({
        receiver_id: memberId,
        proposal_text: proposal,
        exchange_text: exchange,
        status: 'pending'
      });

      if (error) throw error;

      // Send WhatsApp message
      const message = `🤝 *Propuesta de Trato Privado*\n\n👤 *De:* ${profile?.name || 'Ciudadano'}\n📞 *Contacto:* ${phone}\n\n📝 *Propuesta:* ${proposal}\n🔄 *A cambio ofrezco:* ${exchange}\n\n¿Qué te parece? ¡Hagamos que suceda! 🚀🇻🇪`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');

      onClose();
    } catch (error: any) {
      console.error("Error saving deal:", error);
      alert(error.message || "Error al enviar la propuesta. Verifica tu conexión.");
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
                  <Handshake className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue">Hacer un Trato con {memberName}</h3>
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
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Tu Propuesta</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-brand-slate/40" />
                  <textarea
                    placeholder={`Hola ${memberName}, me interesa tu servicio. Te propongo...`}
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    className="min-h-[120px] w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">¿Qué ofreces a cambio?</label>
                <div className="relative">
                  <Repeat className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: 2 horas de asesoría legal..."
                    value={exchange}
                    onChange={(e) => setExchange(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-brand-blue/5 p-4 border border-brand-blue/10">
                <p className="text-[10px] font-medium text-brand-slate leading-relaxed italic">
                  "Este trato es privado y se enviará directamente por WhatsApp. 🔒"
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-blue py-4 font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:bg-brand-blue/90 disabled:opacity-50 active:scale-95"
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
