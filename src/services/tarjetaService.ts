import { supabase } from "@/lib/supabaseClient";
import type { TarjetaFormType } from "@/types/tarjeta";

export const getTarjetas = async (usuario: string) => {
  const { data, error } = await supabase.from("tarjetas").select("*").eq("usuario", usuario);
  if (error) throw error;
  return data;
}

export const insertTarjeta = async (tarjeta: TarjetaFormType) =>{
    await supabase.from('tarjetas').insert([tarjeta]);
}

export const updateTarjeta = async ({tarjeta, id}:{tarjeta: TarjetaFormType, id:string}) =>{
  await supabase.from('tarjetas').update(tarjeta).eq("id", id);
}