import { supabase } from "@/lib/supabaseClient";
import type { PeriodoFormType } from "@/types/periodo";

export const getPeriodos = async (idTarjeta: string) => {
  const { data, error } = await supabase.from("periodos").select("*").eq("idTarjeta", idTarjeta);
  if (error) throw error;
  return data;
}

export const insertPeriodo = async ({periodo, idTarjeta}: {periodo: PeriodoFormType, idTarjeta: string}) =>{
    const {data, error } = await supabase.from('periodos').insert([{...periodo, idTarjeta: idTarjeta, }]);
    if(error) throw error;
    return data;
}