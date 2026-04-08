import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, UserPlus, Trash2, Users, Briefcase, Loader2, CheckCircle, Palette } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { BrandingSettings } from "./BrandingSettings";

interface AdminProfile {
  id: string;
  name: string;
  phone: string;
  role: string;
  department?: string;
}

export function AdminPanel() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState<AdminProfile[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAdminPhone, setNewAdminPhone] = useState("");
  const [newAdminDept, setNewAdminDept] = useState("");
  const [activeTab, setActiveTab] = useState<"admins" | "branding">("admins");

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['admin', 'super_admin']);

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      // Find user by phone
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', newAdminPhone)
        .single();

      if (userError) throw new Error("Usuario no encontrado con ese teléfono");

      // Update role
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin', department: newAdminDept })
        .eq('id', userData.id);

      if (updateError) throw updateError;

      alert("Administrador agregado con éxito");
      setNewAdminPhone("");
      setNewAdminDept("");
      fetchAdmins();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveAdmin = async (id: string) => {
    if (!confirm("¿Estás seguro de quitar los permisos de administrador?")) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'user', department: null })
        .eq('id', id);

      if (error) throw error;
      fetchAdmins();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (profile?.role !== 'super_admin') {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center p-8">
        <Shield className="h-16 w-16 text-brand-red/20 mb-4" />
        <h2 className="text-2xl font-black text-brand-blue">Acceso Restringido</h2>
        <p className="text-brand-slate mt-2">Solo el Super Administrador puede acceder a este panel.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-brand-blue">Panel de Control</h2>
          <p className="text-brand-slate font-medium">Gestión de la plataforma y equipo</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab("admins")}
            className={cn(
              "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-all",
              activeTab === "admins" ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20" : "bg-white text-brand-slate border border-brand-gold/10"
            )}
          >
            <Users className="h-4 w-4" />
            Equipo
          </button>
          <button 
            onClick={() => setActiveTab("branding")}
            className={cn(
              "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-all",
              activeTab === "branding" ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/20" : "bg-white text-brand-slate border border-brand-gold/10"
            )}
          >
            <Palette className="h-4 w-4" />
            Identidad
          </button>
        </div>
      </header>

      {activeTab === "branding" ? (
        <BrandingSettings />
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
        {/* Formulario para agregar */}
        <div className="lg:col-span-1">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-brand-gold/10">
            <h3 className="text-lg font-bold text-brand-blue mb-6 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-brand-gold" />
              Nuevo Administrador
            </h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Teléfono del Usuario</label>
                <input
                  type="tel"
                  placeholder="04121234567"
                  value={newAdminPhone}
                  onChange={(e) => setNewAdminPhone(e.target.value)}
                  className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 px-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60">Departamento</label>
                <select
                  value={newAdminDept}
                  onChange={(e) => setNewAdminDept(e.target.value)}
                  className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 px-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="economy">Economía</option>
                  <option value="education">Educación</option>
                  <option value="infrastructure">Infraestructura</option>
                  <option value="health">Salud</option>
                  <option value="legal">Leyes</option>
                  <option value="tech">Tecnología</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isAdding}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gold py-4 font-bold text-white shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold/90 disabled:opacity-50"
              >
                {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : "Asignar Permisos"}
              </button>
            </form>
          </div>
        </div>

        {/* Lista de administradores */}
        <div className="lg:col-span-2">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-brand-gold/10">
            <h3 className="text-lg font-bold text-brand-blue mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-blue" />
              Equipo de Gestión
            </h3>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
              </div>
            ) : (
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between rounded-3xl bg-brand-bone p-4 border border-brand-gold/5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-brand-blue flex items-center justify-center text-white font-black">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-brand-blue">{admin.name}</p>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                            admin.role === 'super_admin' ? "bg-brand-red text-white" : "bg-brand-gold text-white"
                          )}>
                            {admin.role === 'super_admin' ? "Super Admin" : "Admin"}
                          </span>
                          {admin.department && (
                            <span className="text-[8px] font-bold text-brand-slate uppercase tracking-widest">
                              • {admin.department}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {admin.role !== 'super_admin' && (
                      <button 
                        onClick={() => handleRemoveAdmin(admin.id)}
                        className="rounded-xl bg-white p-3 text-brand-red shadow-sm hover:bg-brand-red hover:text-white transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
