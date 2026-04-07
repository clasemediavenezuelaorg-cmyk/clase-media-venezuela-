import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2, Handshake, Briefcase, Repeat, Image as ImageIcon } from "lucide-react";

interface ServiceOfferFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceOfferForm({ isOpen, onClose }: ServiceOfferFormProps) {
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
                  <Handshake className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue">Ofrecer mi Servicio</h3>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-bone transition-colors">
                <X className="h-5 w-5 text-brand-slate" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Profesión / Oficio</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: Contador, Diseñador, Carpintero..."
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">¿Qué ofreces?</label>
                <textarea
                  placeholder="Describe detalladamente tu servicio..."
                  className="min-h-[80px] w-full rounded-2xl border border-brand-gold/20 bg-brand-bone p-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">¿Qué buscas a cambio?</label>
                <div className="relative">
                  <Repeat className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: Diseño de logo, clases de inglés..."
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Logo (URL de ImgBB u otro)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="url"
                    placeholder="https://i.ibb.co/..."
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                {logoUrl && (
                  <div className="mt-2 flex justify-center">
                    <img src={logoUrl} alt="Vista previa" className="h-16 w-16 rounded-full object-cover border border-brand-gold/20" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 disabled:opacity-50 active:scale-95"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-5 w-5" /> Publicar Oferta</>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
