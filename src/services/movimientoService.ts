import { supabase } from "@/lib/supabaseClient";
import type { MovimientoFormType } from "@/types/movimiento";
import type { Rendimiento } from "@/types/rendimiento";
import { DateTime } from "luxon";

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

export const getRendimientos = async (idUsuario: string) => {
  const { data, error } = await supabase.from('movimientos')
    .select(`
      fecha,
      cantidad,
      motivo,
      periodo:periodos!inner(
        nombre,
        tarjeta:tarjetas!inner(
          nombre,
          tipo
        )
      )
    `)
  .eq("tipo", "r")
  .eq("periodos.tarjetas.usuario", idUsuario)
  .overrideTypes<Rendimiento[], { merge: false }>()

  if(error) throw error;

  return agruparPorMes(data);
}

const agruparPorMes = (data: Rendimiento[]) => {
  return data.reduce<Record<string, Rendimiento[]>>((acc, item) => {
    const mesKey = DateTime.fromISO(item.fecha).toFormat('yyyy-MM');
    if(!acc[mesKey]) {
      acc[mesKey] = [];
    }
    acc[mesKey].push(item);
    return acc;
  }, {});
};