import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Loader2, Handshake, Briefcase, Repeat, Image as ImageIcon, Upload } from "lucide-react";
import { uploadImageToImgBB } from "../services/imgbbService";
import { supabase } from "../lib/supabase";

interface ServiceOfferFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceOfferForm({ isOpen, onClose }: ServiceOfferFormProps) {
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [profession, setProfession] = useState("");
  const [offer, setOffer] = useState("");
  const [need, setNeed] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const url = await uploadImageToImgBB(file);
      setLogoUrl(url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profession || !offer || !need) return;

    setLoading(true);
    try {
      // In a real app, we would get the current user ID from Supabase Auth
      // For now, we use a placeholder ID or let Supabase handle it if allowed
      const { error } = await supabase.from('service_offers').insert({
        profession,
        offer_description: offer,
        need_description: need,
        logo_url: logoUrl,
      });

      if (error) throw error;
      onClose();
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      alert("Error al guardar la oferta. Verifica tu configuración de Supabase.");
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
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">¿Qué ofreces?</label>
                <textarea
                  placeholder="Describe detalladamente tu servicio..."
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
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
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-4 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-blue/60">Logo o Foto (Subir)</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 rounded-xl border border-brand-gold/20 bg-brand-bone px-4 py-2 text-xs font-bold text-brand-blue transition-all hover:border-brand-gold"
                  >
                    <Upload className="h-4 w-4" />
                    Subir Imagen
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  {logoUrl && (
                    <div className="flex items-center gap-2">
                      <img src={logoUrl} alt="Vista previa" className="h-10 w-10 rounded-full object-cover border border-brand-gold/20" referrerPolicy="no-referrer" />
                      <span className="text-[10px] text-emerald-600 font-bold">¡Subida!</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-brand-slate/40 italic">La imagen se subirá directamente a ImgBB.</p>
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
