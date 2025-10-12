import { supabase } from "@/lib/supabaseClient";
import type { TarjetaFormType } from "@/types/tarjeta";

export const getTarjetas = async (usuario: string) => {
  const { data, error } = await supabase.from("tarjetas").select("*").eq("usuario", usuario);
  if (error) throw error;
  return data;
}

export const getTarjetasConSaldo = async (usuario: string) => {
  const { data, error } = await supabase.rpc("get_tarjetas_con_saldo", { usuario_param: usuario });
  if (error) throw error;
  const tarjetas = data.map((tarjeta : any) => ({...tarjeta.t, saldoFinal: tarjeta.saldo_final }));
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