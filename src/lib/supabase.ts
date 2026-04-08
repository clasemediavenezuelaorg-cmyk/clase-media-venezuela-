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

// Helper to check connection and provide better error messages
export const checkSupabaseConnection = async () => {
  try {
    // Try to query 'profiles'
    const { error: errorProfiles } = await supabase.from('profiles').select('*').limit(1);
    
    if (errorProfiles) {
      console.warn('Error con tabla "profiles", intentando "perfiles":', errorProfiles.message);
      
      // Fallback to 'perfiles' if 'profiles' fails
      const { error: errorPerfiles } = await supabase.from('perfiles').select('*').limit(1);
      
      if (errorPerfiles) {
        console.error('Ambas tablas fallaron:', errorPerfiles.message);
        if (errorPerfiles.message.includes('Failed to fetch')) {
          throw new Error('No se pudo conectar con Supabase. Verifica tu internet y las Keys. 🌐');
        }
        if (errorPerfiles.message.includes('schema cache')) {
          throw new Error('Error de Caché: Supabase no reconoce la tabla. Por favor, ejecuta el SQL de "NOTIFY pgrst, reload schema" en tu panel de Supabase. 🔄');
        }
        throw new Error(`Error de base de datos: ${errorPerfiles.message}`);
      }
    }
    return true;
  } catch (err: any) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Supabase Connection Error Details:', err);
    return { error: msg || 'Error de conexión desconocido' };
  }
};
