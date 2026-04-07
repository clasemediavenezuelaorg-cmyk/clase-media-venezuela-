import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, Phone, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertModal({ isOpen, onClose }: AlertModalProps) {
  const [sending, setSending] = useState(false);

  const handleAlert = async () => {
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSending(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-red/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="rounded-full bg-brand-red/10 p-6 text-brand-red animate-pulse shadow-inner">
                <ShieldAlert className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-brand-blue">Alerta Vecinal</h3>
                <p className="text-sm font-medium text-brand-slate">
                  Esto enviará una notificación inmediata a todos los vecinos cercanos y servicios de emergencia.
                </p>
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={handleAlert}
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-red py-4 font-bold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red/90 active:scale-95 disabled:opacity-50"
                >
                  {sending ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <ShieldAlert className="h-6 w-6" />
                      ACTIVAR ALERTA
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="w-full rounded-2xl bg-brand-bone py-4 font-bold text-brand-slate transition-all hover:bg-brand-gold/10"
                >
                  CANCELAR
                </button>
              </div>

              <div className="flex w-full items-center justify-center gap-6 pt-4 border-t border-brand-gold/10">
                <div className="flex flex-col items-center gap-1">
                  <div className="rounded-full bg-brand-bone p-3 text-brand-blue border border-brand-gold/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-slate uppercase tracking-wider">Llamar 911</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="rounded-full bg-brand-bone p-3 text-brand-blue border border-brand-gold/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-slate uppercase tracking-wider">Compartir GPS</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
