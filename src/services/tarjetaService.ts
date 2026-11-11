import { supabase } from "@/lib/supabaseClient";
import type { Tarjeta, TarjetaFormType } from "@/types/tarjeta";

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

export const getTarjetaConUltimoPeriodo = async (id: string) => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error("Usuario no autenticado");

  const tarjetas = await getTarjetasConUltimoPeriodo(user.id) as Tarjeta[];
  return tarjetas.find((tarjeta: Tarjeta) => tarjeta.id === id);
}