import { useState, useEffect } from "react";
import { 
  Users, 
  Trophy, 
  Calendar, 
  Target, 
  Plus, 
  Trash2, 
  Loader2, 
  Image as ImageIcon,
  MapPin,
  Save
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { cn } from "@/src/lib/utils";

type ManagerTab = "members" | "achievements" | "assemblies" | "plans";

export function OrganizationManager() {
  const [activeTab, setActiveTab] = useState<ManagerTab>("members");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // Form states
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let table = "";
      if (activeTab === "members") table = "organization_members";
      else if (activeTab === "achievements") table = "achievements";
      else if (activeTab === "assemblies") table = "assemblies";
      else if (activeTab === "plans") table = "plans";

      const { data: result } = await supabase.from(table).select('*').order('created_at', { ascending: false });
      setData(result || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let table = "";
      if (activeTab === "members") table = "organization_members";
      else if (activeTab === "achievements") table = "achievements";
      else if (activeTab === "assemblies") table = "assemblies";
      else if (activeTab === "plans") table = "plans";

      const { error } = await supabase.from(table).insert(formData);
      if (error) throw error;

      setFormData({});
      fetchData();
      alert("Guardado con éxito");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este registro?")) return;
    try {
      let table = "";
      if (activeTab === "members") table = "organization_members";
      else if (activeTab === "achievements") table = "achievements";
      else if (activeTab === "assemblies") table = "assemblies";
      else if (activeTab === "plans") table = "plans";

      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setActiveTab("members")}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
            activeTab === "members" ? "bg-brand-blue text-white" : "bg-white text-brand-slate border border-brand-gold/10"
          )}
        >
          <Users className="h-4 w-4" /> Miembros
        </button>
        <button 
          onClick={() => setActiveTab("achievements")}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
            activeTab === "achievements" ? "bg-brand-blue text-white" : "bg-white text-brand-slate border border-brand-gold/10"
          )}
        >
          <Trophy className="h-4 w-4" /> Logros
        </button>
        <button 
          onClick={() => setActiveTab("assemblies")}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
            activeTab === "assemblies" ? "bg-brand-blue text-white" : "bg-white text-brand-slate border border-brand-gold/10"
          )}
        >
          <Calendar className="h-4 w-4" /> Asambleas
        </button>
        <button 
          onClick={() => setActiveTab("plans")}
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
            activeTab === "plans" ? "bg-brand-blue text-white" : "bg-white text-brand-slate border border-brand-gold/10"
          )}
        >
          <Target className="h-4 w-4" /> Planes
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Formulario */}
        <div className="lg:col-span-1">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-brand-gold/10">
            <h3 className="text-lg font-bold text-brand-blue mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-brand-gold" />
              Agregar Nuevo
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              {activeTab === "members" && (
                <>
                  <input 
                    type="text" placeholder="Nombre" 
                    value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <input 
                    type="text" placeholder="Cargo" 
                    value={formData.role || ""} onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <select 
                    value={formData.level || "national"} onChange={e => setFormData({...formData, level: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none"
                  >
                    <option value="national">Nacional</option>
                    <option value="state">Estatal</option>
                  </select>
                  {formData.level === "state" && (
                    <input 
                      type="text" placeholder="Estado (Ej: Zulia)" 
                      value={formData.state || ""} onChange={e => setFormData({...formData, state: e.target.value})}
                      className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                    />
                  )}
                  <input 
                    type="url" placeholder="URL de Foto" 
                    value={formData.photo_url || ""} onChange={e => setFormData({...formData, photo_url: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" 
                  />
                </>
              )}

              {activeTab === "achievements" && (
                <>
                  <input 
                    type="text" placeholder="Título del Logro" 
                    value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <textarea 
                    placeholder="Descripción" 
                    value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none min-h-[100px]" required 
                  />
                  <input 
                    type="date" 
                    value={formData.date || ""} onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <input 
                    type="url" placeholder="URL de Imagen" 
                    value={formData.image_url || ""} onChange={e => setFormData({...formData, image_url: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" 
                  />
                </>
              )}

              {activeTab === "assemblies" && (
                <>
                  <input 
                    type="text" placeholder="Título de la Asamblea" 
                    value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <textarea 
                    placeholder="Descripción" 
                    value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none min-h-[100px]" required 
                  />
                  <input 
                    type="datetime-local" 
                    value={formData.date || ""} onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <input 
                    type="text" placeholder="Ubicación" 
                    value={formData.location || ""} onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                </>
              )}

              {activeTab === "plans" && (
                <>
                  <input 
                    type="text" placeholder="Título del Plan" 
                    value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <textarea 
                    placeholder="Descripción" 
                    value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none min-h-[100px]" required 
                  />
                  <input 
                    type="date" 
                    value={formData.target_date || ""} onChange={e => setFormData({...formData, target_date: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none" required 
                  />
                  <select 
                    value={formData.status || "planned"} onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-bone p-3 text-sm focus:outline-none"
                  >
                    <option value="planned">Planificado</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="completed">Completado</option>
                  </select>
                </>
              )}

              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold py-3 font-bold text-white shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold/90 disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Guardar</>}
              </button>
            </form>
          </div>
        </div>

        {/* Lista */}
        <div className="lg:col-span-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-brand-gold/10">
            <h3 className="text-lg font-bold text-brand-blue mb-4">Registros Existentes</h3>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
              </div>
            ) : (
              <div className="space-y-3">
                {data.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl bg-brand-bone p-4 border border-brand-gold/5">
                    <div className="flex items-center gap-3">
                      {activeTab === "members" && (
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-brand-blue/10">
                          {item.photo_url ? <img src={item.photo_url} className="h-full w-full object-cover" /> : <Users className="h-full w-full p-2 text-brand-blue" />}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-brand-blue">{item.name || item.title}</p>
                        <p className="text-[10px] text-brand-slate uppercase tracking-widest">
                          {item.role || item.status || item.location || (item.date && new Date(item.date).toLocaleDateString())}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg bg-white p-2 text-brand-red shadow-sm hover:bg-brand-red hover:text-white transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {data.length === 0 && <p className="text-center py-8 text-brand-slate italic text-sm">No hay registros aún.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
