import { supabase } from "@/lib/supabaseClient";
import type { EfectivoFormType } from "@/types/efectivo"


export const insertEfectivo = async (denominaciones: EfectivoFormType)=>{
    const fecha = new Date();
    const {data, error } = await supabase.from('efectivo').insert([{fecha: fecha, ...denominaciones }]);
    if(error) throw error;
    return data;
} 

export const getEfectivo = async (idUsuario: string) =>{
    const { data, error } = await supabase.from("efectivo").select("*").eq("idUsuario", idUsuario).order("fecha", { ascending: false });
    if (error) throw error;
    return data;
}

export const getLastEfectivo = async (idUsuario: string) =>{
    const { data, error } = await supabase.from("efectivo").select("*").eq("idUsuario", idUsuario)
        .order("fecha", { ascending: false })
        .limit(1)
        .single();
    if (error) throw error;
    return data;
}