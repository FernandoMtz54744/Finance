import { supabase } from "@/lib/supabaseClient";
import type { TarjetaFormType } from "@/types/tarjeta";

export const getAllTarjetas = async () => {
  const { data, error } = await supabase.from("tarjetas").select("*");
  if (error) throw error;
  return data;
}

export const getTarjetas = async (usuario: string) => {
  const { data, error } = await supabase.from("tarjetas").select("*").eq("usuario", usuario);
  if (error) throw error;
  return data;
}

export const getTarjetasConUltimoPeriodo = async (usuario: string) => {
  const { data: tarjetas, error } = await supabase.rpc("get_tarjetas_con_ultimo_periodo", { usuario_param: usuario });
  if (error) throw error;
  return tarjetas;
}

export const insertTarjeta = async (tarjeta: TarjetaFormType) =>{
  const { data, error } = await supabase.from('tarjetas').insert([tarjeta]);
  if(error) throw error;
  return data;
}

export const updateTarjeta = async ({tarjeta, id}:{tarjeta: TarjetaFormType, id:string}) =>{
  const { data, error } = await supabase.from('tarjetas').update(tarjeta).eq("id", id);
  if(error) throw error;
  return data;
}