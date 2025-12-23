import { supabase } from "@/lib/supabaseClient";
import type { MovimientoFormType } from "@/types/movimiento";

export const getMovimientos = async (idPeriodo: string) => {
  const { data, error } = await supabase.from("movimientos").select("*").eq("idPeriodo", idPeriodo);
  if (error) throw error;
  return data;
}

export const insertMovimiento = async ({movimiento, idPeriodo}: {movimiento: MovimientoFormType, idPeriodo: string}) =>{
    const {data, error } = await supabase
      .from('movimientos')
      .insert([{...movimiento, idPeriodo: idPeriodo }])
      .select()
      .single();
    if(error) throw error;
    return data;
}

export const deleteMovimiento = async (id: number) =>{
  const { data, error } = await supabase.from('movimientos').delete().eq('id', id);
  if(error) throw error;
  return data;

}