import type { movimientoSchema } from "@/validations/movimientoSchema";
import { z } from "zod"
import type { Categoria } from "./categoria";

export type Movimiento = {
    id: number,
    idPeriodo: number,
    fecha: string,
    cantidad: number,
    motivo: string,
    tipo: 'a' | 'c' | 'r' | 't', //[Abono, Cargo, Rendimiento, Transferencia (misma cuenta)]
    categoria: Categoria
}

export type MovimientoFormType = z.infer<typeof movimientoSchema>;