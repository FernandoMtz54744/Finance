import { supabase } from "@/lib/supabaseClient";
import type { Efectivo } from "@/types/efectivo";
import type { Tarjeta } from "@/types/tarjeta";

export const insertSaldo = async ({tarjetas,efectivo}: {tarjetas: Tarjeta[], efectivo: Efectivo}) =>{
    const insertData = { 
      fecha: new Date(),
      efectivo: {... efectivo.denominaciones},
      tarjetas: tarjetas.map(({nombre, ultimoPeriodo, tipo}) => ({nombre, tipo, saldoFinal: ultimoPeriodo?.saldoFinal ?? 0 }) )
    };

    const {data, error } = await supabase.from('saldos').insert(insertData);

    if(error) throw error;
    return data;
}

export const getSaldos = async (idUsuario: string) =>{
    const { data, error } = await supabase.from("saldos").select("*").eq("idUsuario", idUsuario).order("fecha", { ascending: false });
    if (error) throw error;
    return data;
}