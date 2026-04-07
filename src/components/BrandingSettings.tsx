import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Settings, Upload, Image as ImageIcon, Save, Loader2, Palette, Type } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

interface AppSettings {
  logo_url: string | null;
  app_name: string;
  primary_color: string | null;
}

export function BrandingSettings() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    logo_url: null,
    app_name: "Clase Media Venezuela",
    primary_color: null,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .eq('id', 'global')
        .single();

      if (error) throw error;
      if (data) setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSaving(true);
    try {
      // Using ImgBB pattern as per project style (simulated here with a direct link update)
      // In a real scenario, we'd upload to Supabase Storage or ImgBB
      const formData = new FormData();
      formData.append('image', file);
      
      // Placeholder for ImgBB upload logic
      // const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method: 'POST', body: formData });
      // const result = await response.json();
      // const url = result.data.url;

      // For now, we'll ask the user to provide a URL or simulate a successful upload to a public bucket
      const mockUrl = URL.createObjectURL(file); // Temporary for preview
      alert("En una implementación real, aquí se subiría a ImgBB. Por ahora, ingresa la URL manualmente o usa este simulador.");
      
      const manualUrl = prompt("Ingresa la URL de tu logo (ej: de ImgBB):", settings.logo_url || "");
      if (manualUrl) {
        setSettings(prev => ({ ...prev, logo_url: manualUrl }));
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('app_settings')
        .update({
          logo_url: settings.logo_url,
          app_name: settings.app_name,
          primary_color: settings.primary_color,
          updated_at: new Date().toISOString()
        })
        .eq('id', 'global');

      if (error) throw error;
      alert("Configuración guardada con éxito. Recarga la página para ver los cambios.");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (profile?.role !== 'super_admin') return null;

  return (
    <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-brand-gold/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-brand-blue flex items-center gap-2">
          <Settings className="h-6 w-6 text-brand-gold" />
          Identidad Visual
        </h3>
        {saving && <Loader2 className="h-5 w-5 animate-spin text-brand-gold" />}
      </div>

      <div className="space-y-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-brand-bone border border-dashed border-brand-gold/30">
          <div className="h-24 w-24 rounded-2xl bg-white shadow-inner flex items-center justify-center overflow-hidden border border-brand-gold/10">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="App Logo" className="h-full w-full object-contain p-2" referrerPolicy="no-referrer" />
            ) : (
              <ImageIcon className="h-10 w-10 text-brand-slate/20" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-brand-blue">Logo de la Aplicación</p>
            <p className="text-[10px] text-brand-slate uppercase tracking-widest mt-1">Recomendado: PNG transparente 512x512</p>
          </div>
          <div className="flex gap-2">
            <label className="cursor-pointer flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2 text-xs font-bold text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all">
              <Upload className="h-4 w-4" />
              Subir Imagen
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            </label>
            <button 
              onClick={() => {
                const url = prompt("Ingresa la URL directa del logo:", settings.logo_url || "");
                if (url !== null) setSettings(prev => ({ ...prev, logo_url: url }));
              }}
              className="flex items-center gap-2 rounded-xl border border-brand-gold/30 px-4 py-2 text-xs font-bold text-brand-gold hover:bg-brand-gold/5"
            >
              URL Directa
            </button>
          </div>
        </div>

        {/* App Name & Colors */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60 flex items-center gap-2">
              <Type className="h-3 w-3" /> Nombre de la App
            </label>
            <input
              type="text"
              value={settings.app_name}
              onChange={(e) => setSettings(prev => ({ ...prev, app_name: e.target.value }))}
              className="w-full rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 px-4 text-sm font-medium text-brand-blue focus:border-brand-gold focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-brand-blue/60 flex items-center gap-2">
              <Palette className="h-3 w-3" /> Color Principal
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={settings.primary_color || "#003366"}
                onChange={(e) => setSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                className="h-11 w-11 rounded-xl border-none bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={settings.primary_color || "#003366"}
                onChange={(e) => setSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                className="flex-grow rounded-2xl border border-brand-gold/20 bg-brand-bone py-3 px-4 text-sm font-mono text-brand-blue focus:border-brand-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gold py-4 font-bold text-white shadow-lg shadow-brand-gold/20 transition-all hover:bg-brand-gold/90 disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Guardar Identidad Visual
        </button>
      </div>
    </div>
  );
}
