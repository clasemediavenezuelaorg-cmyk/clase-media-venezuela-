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
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar con Supabase. Verifica que la URL y la Key en "Settings > Secrets" sean correctas y que tengas conexión a internet. 🌐');
      }
      throw error;
    }
    return true;
  } catch (err: any) {
    console.error('Supabase Connection Error:', err.message);
    return { error: err.message };
  }
};
