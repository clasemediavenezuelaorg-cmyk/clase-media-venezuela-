import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2, FileText, AlignLeft, Tag } from "lucide-react";

interface ProposalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalForm({ isOpen, onClose }: ProposalFormProps) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const categories = [
    "Economía", "Educación", "Infraestructura", "Salud", "Leyes", "Tecnología"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    
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
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue">Nueva Propuesta</h3>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-bone transition-colors">
                <X className="h-5 w-5 text-brand-slate" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Título de la Propuesta</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: Reforma de la Ley de Propiedad Horizontal"
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Categoría / Comisión</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`rounded-xl border py-2 text-[10px] font-bold transition-all ${
                        category === cat
                          ? "border-brand-blue bg-brand-blue text-white shadow-md"
                          : "border-brand-gold/20 bg-brand-bone text-brand-slate hover:border-brand-gold"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Descripción y Justificación</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-4 h-4 w-4 text-brand-slate/40" />
                  <textarea
                    placeholder="Explica el problema y tu solución técnica..."
                    className="min-h-[120px] w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Etiquetas (Opcional)</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: legal, servicios, reforma..."
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !category}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar a Revisión Técnica
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
