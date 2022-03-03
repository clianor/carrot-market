import { createClient, SupabaseClient } from '@supabase/supabase-js';

declare global {
  var spClient: SupabaseClient;
}

const spClient: SupabaseClient =
  global.spClient || createClient(process.env.SP_URL as string, process.env.SP_TOKEN as string);

if (process.env.NODE_ENV === 'development') global.spClient = spClient;

export default spClient;
