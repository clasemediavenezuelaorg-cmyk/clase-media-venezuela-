import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AppSettings {
  logo_url: string | null;
  app_name: string;
  primary_color: string | null;
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>({
    logo_url: null,
    app_name: "Clase Media Venezuela",
    primary_color: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchSettings();
  }, []);

  return { settings, loading };
}
