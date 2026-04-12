import type z from "zod";
import type { Categoria } from "./categoria"
import type { fechaInicioFinSchema } from "@/validations/fechaInicioFinSchema";

export type MovimientoEstadistica = {
    id: number,
    fecha: string,
    cantidad: number,
    motivo: string,
    tipo: 'a' | 'c' | 'r' | 't', //[Abono, Cargo, Rendimiento, Transferencia (misma cuenta)]
    categoria: Categoria
}

export type MovimientosEstadisticasFormType = z.infer<typeof fechaInicioFinSchema>;