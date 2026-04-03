import type { movimientoSchema } from "@/validations/movimientoSchema";
import { z } from "zod"

export type Movimiento = {
    id: number,
    idPeriodo: number,
    fecha: string,
    cantidad: number,
    motivo: string,
    tipo: 'a' | 'c' | 'r' | 't' //[Abono, Cargo, Rendimiento, Transferencia (misma cuenta)]
}

export type MovimientoFormType = z.infer<typeof movimientoSchema>;