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
    // 1. Check if we can even reach the Auth service
    const { data: authHealth, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.warn('Auth service health check failed:', authError.message);
    }

    // 2. Try a very simple query to a system table if possible, or just the profiles table
    // We use a very limited select to minimize data transfer
    const { error: errorProfiles } = await supabase.from('profiles').select('id').limit(1);
    
    if (errorProfiles) {
      const msg = errorProfiles.message.toLowerCase();
      console.warn('Aviso en tabla "profiles":', errorProfiles.message);
      
      // If it's a schema error, it's a Supabase Cache issue
      if (msg.includes('schema') || msg.includes('cache') || msg.includes('querying schema')) {
        return { 
          error: 'Error de Esquema en Supabase (PostgREST Cache)',
          details: 'La base de datos ha cambiado pero el servicio de API no se ha enterado. Por favor, ve al SQL Editor de Supabase y ejecuta: NOTIFY pgrst, "reload schema";',
          isSchemaError: true
        };
      }
      
      // Check if it's a "relation does not exist" error
      if (msg.includes('relation') && msg.includes('does not exist')) {
        return {
          error: 'Error de Estructura: Tabla "profiles" no encontrada',
          details: 'Parece que la tabla de perfiles no existe o no tienes permisos. Por favor, ejecuta el script de creación de tablas (schema.sql) en el SQL Editor de Supabase.',
          isSchemaError: true
        };
      }

      // Check for permission issues
      if (msg.includes('permission denied') || msg.includes('insufficient permissions')) {
        return {
          error: 'Error de Permisos',
          details: 'El usuario anónimo no tiene permisos para leer la tabla "profiles". Ejecuta: GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated; en el SQL Editor.',
          isSchemaError: true
        };
      }

      return { error: errorProfiles.message };
    }
    return true;
  } catch (err: any) {
    return { error: err.message || 'Error de conexión desconocido' };
  }
};
