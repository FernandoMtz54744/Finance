import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js"

dotenv.config({ path: '.env.local' });
export const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
)

export const getAllTarjetas = async () => {
  const { data, error } = await supabase.from("tarjetas").select("*");
  if (error) throw error;
  return data;
}