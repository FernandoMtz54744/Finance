import { supabase } from "@/lib/supabaseClient";

export const getCategorias = async () => {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("idCategoria", { ascending: true });

    if (error) throw error;

  return data;
};