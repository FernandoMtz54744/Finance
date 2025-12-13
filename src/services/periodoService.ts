import { supabase } from "@/lib/supabaseClient";
import type { PeriodoFormType } from "@/types/periodo";

export const getPeriodos = async (idTarjeta: string) => {
  const { data, error } = await supabase.from("periodos").select("*").eq("idTarjeta", idTarjeta);
  if (error) throw error;
  return data;
}

export const getPeriodo = async (idPeriodo: string) => {
  const { data, error } = await supabase.from("periodos").select("*").eq("id", idPeriodo);
  if (error) throw error;
  return data;
}

export const insertPeriodo = async ({periodo, idTarjeta}: {periodo: PeriodoFormType, idTarjeta: string}) => {
    const {data, error } = await supabase.from('periodos').insert([{...periodo, idTarjeta: idTarjeta, }]);
    if(error) throw error;
    return data;
}

export const updateFile = async (link: string, idPeriodo: string) =>{
  const { data, error } = await supabase.from("periodos").update({ documento: link }).eq("id", idPeriodo).select().single();
  if(error) throw error;
  return data;
}

export const markAsValid = async (idPeriodo: string) =>{
  const { data, error } = await supabase.from("periodos").update({ validado: true }).eq("id", idPeriodo).select().single();
  if(error) throw error;
  return data;
}