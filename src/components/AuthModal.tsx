import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Phone, Lock, Loader2, LogIn, UserPlus, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { supabase, checkSupabaseConnection } from "../lib/supabase";
import { cn } from "@/src/lib/utils";

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
  const [showPassword, setShowPassword] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "error">("checking");

  useEffect(() => {
    if (isOpen) {
      const check = async () => {
        const result = await checkSupabaseConnection();
        if (result !== true) {
          setConnectionStatus("error");
          console.error("Fallo de conexión inicial:", result);
          return;
        }
        
        setConnectionStatus("connected");
        
        // Check if any profiles exist
        const { count, error } = await supabase
          .from("profiles")
          .select("*", { count: 'exact', head: true });
          
        if (error) {
          console.error("Error al contar perfiles:", error.message);
          // Don't switch mode if there's a DB error
          return;
        }
          
        if (count === 0) {
          console.log("No se detectaron usuarios. Cambiando a modo Registro.");
          setMode("register");
        }
      };
      check();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanPhone = phone.trim().toLowerCase();
      const email = cleanPhone.includes('@') ? cleanPhone : `${cleanPhone}@clasemedia.com`;

      if (mode === "register") {
        console.log("Iniciando proceso de registro para:", cleanPhone);
        if (password !== confirmPassword) {
          throw new Error("Las contraseñas no coinciden");
        }

        console.log("Email de registro generado:", email);
        
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) {
          console.error("Error en signUp de Supabase:", authError);
          if (authError.message.includes("not valid")) {
            throw new Error("Supabase rechaza el formato del correo. Por favor, asegúrate de que el 'Email Provider' esté activado en tu panel de Supabase.");
          }
          throw authError;
        }

        if (authData.user) {
          console.log("Usuario creado en Auth. Creando perfil...");
          // Check if this is the first user
          const { count } = await supabase
            .from("profiles")
            .select("*", { count: 'exact', head: true });

          const isFirstUser = count === 0;
          const isSuperAdmin = isFirstUser || cleanPhone === "cmv-001";

          // Create profile
          const { error: profileError } = await supabase.from("profiles").insert({
            id: authData.user.id,
            name: name.trim(),
            phone: cleanPhone,
            role: isSuperAdmin ? "super_admin" : "user",
          });

          if (profileError) {
            console.error("Error al crear perfil en base de datos:", profileError);
            throw profileError;
          }
          console.log("Perfil creado exitosamente con rol:", isSuperAdmin ? "super_admin" : "user");
        }
      } else {
        console.log("Intentando entrar con:", email);
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Error en signIn de Supabase:", error);
          throw error;
        }
        
        console.log("Inicio de sesión exitoso en Auth. Verificando perfil...");
        
        // Ensure profile exists even if login was used
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", userData.user.id)
            .single();
            
          if (!profile) {
            console.log("Perfil no encontrado tras login. Creando perfil de emergencia...");
            const isSuperAdmin = cleanPhone === "cmv-001";
            await supabase.from("profiles").insert({
              id: userData.user.id,
              name: name.trim() || "Administrador",
              phone: cleanPhone,
              role: isSuperAdmin ? "super_admin" : "user",
            });
          }
        }
        console.log("Acceso concedido.");
      }

      onClose();
    } catch (error: any) {
      console.error("Auth error:", error);
      let errorMessage = error.message || "Error en la autenticación";
      
      if (errorMessage.includes("Invalid login credentials")) {
        errorMessage = "❌ ACCESO DENEGADO: El usuario o la clave son incorrectos. Si acabas de conectar esta base de datos, DEBES usar la pestaña 'REGISTRARME' primero para crear tu cuenta. 🔑🛡️";
      } else if (errorMessage.includes("Email not confirmed")) {
        errorMessage = "⚠️ ERROR DE CONFIGURACIÓN: El correo no ha sido confirmado. Por favor, ve a tu panel de Supabase (Authentication > Providers > Email) y DESACTIVA la opción 'Confirm Email' para permitir el acceso directo. 📧🚫";
      } else if (errorMessage.includes("Email rate limit exceeded") || errorMessage.includes("email rate limit exceeded")) {
        errorMessage = "⏳ LÍMITE DE SUPABASE: Has hecho demasiados intentos seguidos. Espera un momento o aumenta los límites en tu panel de Supabase (Authentication > Settings > Rate Limits).";
      } else if (errorMessage.includes("Failed to fetch")) {
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
                <div>
                  <h3 className="text-xl font-bold text-brand-blue leading-none">
                    {mode === "login" ? "Iniciar Sesión" : "Registro Ciudadano"}
                  </h3>
                  <div className="mt-1 flex items-center gap-1">
                    {connectionStatus === "checking" && (
                      <span className="flex items-center gap-1 text-[8px] font-bold text-brand-slate uppercase tracking-widest">
                        <Loader2 className="h-2 w-2 animate-spin" /> Verificando conexión...
                      </span>
                    )}
                    {connectionStatus === "connected" && (
                      <span className="flex items-center gap-1 text-[8px] font-bold text-green-600 uppercase tracking-widest">
                        <CheckCircle2 className="h-2 w-2" /> Base de datos conectada
                      </span>
                    )}
                    {connectionStatus === "error" && (
                      <span className="flex items-center gap-1 text-[8px] font-bold text-brand-red uppercase tracking-widest">
                        <AlertCircle className="h-2 w-2" /> Error de configuración
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-bone transition-colors">
                <X className="h-5 w-5 text-brand-slate" />
              </button>
            </div>

            <div className="flex border-b border-brand-gold/10">
              <button 
                onClick={() => setMode("login")}
                className={cn(
                  "flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all",
                  mode === "login" ? "bg-brand-blue text-white" : "bg-white text-brand-slate hover:bg-brand-bone"
                )}
              >
                Entrar
              </button>
              <button 
                onClick={() => setMode("register")}
                className={cn(
                  "relative flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all",
                  mode === "register" ? "bg-brand-blue text-white" : "bg-white text-brand-slate hover:bg-brand-bone"
                )}
              >
                Registrarme
                {mode === "login" && (
                  <span className="absolute -right-1 top-1 flex h-4 items-center rounded-full bg-brand-red px-1.5 text-[8px] font-black text-white shadow-lg animate-pulse">
                    NUEVO
                  </span>
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {mode === "login" && (
                <div className="rounded-2xl bg-brand-gold/10 p-4 border border-brand-gold/20 mb-2">
                  <p className="text-[10px] font-bold text-brand-blue leading-tight">
                    💡 <span className="uppercase">Importante:</span> Si es tu primera vez usando esta base de datos, debes usar la pestaña <span className="text-brand-red">"REGISTRARME"</span> arriba.
                  </p>
                </div>
              )}
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
                <p className="text-[8px] text-brand-slate/40 px-2 italic">
                  * Usa el mismo formato que usaste al registrarte.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 pl-12 pr-12 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-slate/40 hover:text-brand-blue transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-slate/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 pl-12 pr-12 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
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

              <div className="pt-2 text-center space-y-2">
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="text-xs font-bold text-brand-gold hover:underline"
                >
                  {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
                
                <div className="pt-4 border-t border-brand-gold/5">
                  <div className="rounded-lg bg-brand-slate/5 p-2 text-left">
                    <p className="text-[7px] font-mono text-brand-slate/60 uppercase tracking-tighter mb-1">Datos de envío (Debug):</p>
                    <p className="text-[8px] font-mono text-brand-blue/80 truncate">
                      EMAIL: <span className="font-bold">{phone.trim().toLowerCase()}@clasemedia.com</span>
                    </p>
                    <p className="text-[8px] font-mono text-brand-blue/80">
                      PROYECTO: <span className="font-bold">tygwqsyzudinvtayscpj</span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
