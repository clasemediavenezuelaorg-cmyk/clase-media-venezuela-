import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Camera, Send, Loader2 } from "lucide-react";

interface ServiceReportFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceReportForm({ isOpen, onClose }: ServiceReportFormProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
              <h3 className="text-xl font-bold text-brand-blue">Nuevo Reporte</h3>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-bone transition-colors">
                <X className="h-5 w-5 text-brand-slate" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Tipo de Avería</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Agua", "Electricidad", "Vialidad", "Seguridad", "Aseo", "Otro"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`rounded-xl border p-3 text-sm font-bold transition-all ${
                        type === t
                          ? "border-brand-blue bg-brand-blue text-white shadow-md"
                          : "border-brand-gold/20 bg-brand-bone text-brand-slate hover:border-brand-gold"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Descripción</label>
                <textarea
                  placeholder="Describe el problema con detalle..."
                  className="min-h-[100px] w-full rounded-2xl border border-brand-gold/20 bg-brand-bone p-4 text-sm font-medium text-brand-blue placeholder:text-brand-slate/40 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 text-xs font-bold text-brand-blue hover:bg-brand-gold/10 transition-all"
                >
                  <MapPin className="h-4 w-4" />
                  Ubicación
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 text-xs font-bold text-brand-blue hover:bg-brand-gold/10 transition-all"
                >
                  <Camera className="h-4 w-4" />
                  Foto
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || !type}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-red py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar Reporte
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
