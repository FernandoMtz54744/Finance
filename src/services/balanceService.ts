import { supabase } from "@/lib/supabaseClient";
import type { MovimientoBalance } from "@/types/movimientoBalance";

export const getMovimientosBalance = async (idUsuario: string, fechaInicio: string, fechaFin: string): Promise<MovimientoBalance[]> => {
  const { data, error } = await supabase
  .from("movimientos")
  .select(`id, fecha, cantidad, motivo, tipo, 
    periodos( 
        tarjetas(
            nombre, tipo
        )
    ),
    categoria:categorias (
        idCategoria,
        descripcion,
        icono
      )`)
  .eq("periodos.tarjetas.usuario", idUsuario)
  .gte("fecha", fechaInicio)
  .lte("fecha", fechaFin);  
  if (error) throw error;


  const movimientoBalance: MovimientoBalance[] = data.map(data => ({
    id: data.id,
    fecha: data.fecha,
    cantidad: data.cantidad,
    motivo: data.motivo,
    tipo: data.tipo,
    tarjeta: {
        nombre: data.periodos.tarjetas.nombre,
        tipo: data.periodos.tarjetas.tipo
    },
    categoria: data.categoria
  }
  ));

  return movimientoBalance;
}