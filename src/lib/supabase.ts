import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                   import.meta.env.NEXT_PUBLIC_ALMACENAMIENTO_SUPABASE_URL ||
                   import.meta.env.ALMACENAMIENTO_SUPABASE_URL;

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                        import.meta.env.NEXT_PUBLIC_ALMACENAMIENTO_SUPABASE_ANON_KEY ||
                        import.meta.env.NEXT_PUBLIC_ALMACENAMIENTO_SUPABASE_PUBLISHABLE_KEY ||
                        import.meta.env.ALMACENAMIENTO_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your environment variables in Settings > Secrets.');
} else {
  console.log('Supabase URL detected:', supabaseUrl.substring(0, 15) + '...');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export const checkSupabaseConnection = async () => {
  try {
    const { error: errorProfiles } = await supabase.from('profiles').select('*').limit(1);
    
    if (errorProfiles) {
      console.error('Error crítico en tabla "profiles":', errorProfiles.message);
      
      const { error: errorPerfiles } = await supabase.from('perfiles').select('*').limit(1);
      
      if (errorPerfiles) {
        console.error('Error crítico en tabla "perfiles":', errorPerfiles.message);
        throw new Error(`Error de base de datos: ${errorPerfiles.message}. Por favor, ejecuta el script de REPARACIÓN en Supabase.`);
      }
    }
    return true;
  } catch (err: any) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Supabase Connection Error Details:', err);
    return { error: msg };
  }
};
