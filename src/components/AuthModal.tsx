import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Phone, Lock, Loader2, LogIn, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          throw new Error("Las contraseñas no coinciden");
        }

        // Use phone as a dummy email for Supabase Auth
        const email = `${phone}@cm.app`;
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // Check if this is the first user
          const { count } = await supabase
            .from("profiles")
            .select("*", { count: 'exact', head: true });

          const isFirstUser = count === 0;
          const isSuperAdmin = isFirstUser || phone === "cmv-001";

          // Create profile
          const { error: profileError } = await supabase.from("profiles").insert({
            id: authData.user.id,
            name,
            phone,
            role: isSuperAdmin ? "super_admin" : "user",
          });

          if (profileError) throw profileError;
        }
      } else {
        const email = `${phone}@cm.app`;
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }

      onClose();
    } catch (error: any) {
      console.error("Auth error:", error);
      let errorMessage = error.message || "Error en la autenticación";
      if (errorMessage.includes("Failed to fetch")) {
        errorMessage = "No se pudo conectar con el servidor. Verifica tu conexión a internet y la configuración de Supabase en 'Settings > Secrets'. 🌐🔌";
      }
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-brand-gold/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-brand-blue/10 p-2 text-brand-blue">
                  {mode === "login" ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                </div>
                <h3 className="text-xl font-bold text-brand-blue">
                  {mode === "login" ? "Iniciar Sesión" : "Registro Ciudadano"}
                </h3>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-bone transition-colors">
                <X className="h-5 w-5 text-brand-slate" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {mode === "register" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                    <input
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Usuario o Teléfono</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="text"
                    placeholder="Ej: cmv-001 o 04121234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 pl-12 pr-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-blue py-4 font-bold text-white shadow-lg shadow-brand-blue/20 transition-all hover:bg-brand-blue/90 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  mode === "login" ? "Entrar" : "Registrarme"
                )}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-xs font-bold text-brand-gold hover:underline"
                >
                  {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
