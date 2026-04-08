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
    // Try a very simple query
    const { error: errorProfiles } = await supabase.from('profiles').select('id').limit(1);
    
    if (errorProfiles) {
      console.warn('Aviso en tabla "profiles":', errorProfiles.message);
      
      // If it's a schema error, it's a Supabase Cache issue
      if (errorProfiles.message.includes('schema') || errorProfiles.message.includes('cache')) {
        return { 
          error: 'Error de Esquema en Supabase',
          details: 'La base de datos necesita recargar su caché. Por favor, ve al SQL Editor de Supabase y ejecuta: NOTIFY pgrst, "reload schema";',
          isSchemaError: true
        };
      }

      // Try fallback
      const { error: errorPerfiles } = await supabase.from('perfiles').select('id').limit(1);
      if (errorPerfiles) {
        return { error: errorPerfiles.message };
      }
    }
    return true;
  } catch (err: any) {
    return { error: err.message || 'Error de conexión' };
  }
};
