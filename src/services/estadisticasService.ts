import { supabase } from "@/lib/supabaseClient";
import type { MovimientoEstadistica } from "@/types/movimientoEstadistica";


export const getMovimientosEstadistica = async (idUsuario: string, fechaInicio: string, fechaFin: string): Promise<MovimientoEstadistica[]> => {
    const { data, error } = await supabase
    .from("movimientos")
    .select(`id, fecha, cantidad, motivo, tipo,
    categoria:categorias (
        idCategoria,
        descripcion,
        icono
        ),
    periodos (
        tarjetas (
            usuario
        )
    )`)
    .eq("periodos.tarjetas.usuario", idUsuario)
    .gte("fecha", fechaInicio)
    .lte("fecha", fechaFin);  

    if (error) throw error;

    const movimientoEstadistica: MovimientoEstadistica[] = data.map(data => ({
        id: data.id,
        fecha: data.fecha,
        cantidad: data.cantidad,
        motivo: data.motivo,
        tipo: data.tipo,
        categoria: Array.isArray(data.categoria) ? data.categoria[0] : data.categoria
    }
    ));

  return movimientoEstadistica;
}