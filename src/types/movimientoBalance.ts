import type { movimientoBalanceSchema } from "@/validations/movimientosBalanceSchema";
import type z from "zod";

export type MovimientoBalance = {
    id: number,
    fecha: string,
    cantidad: number,
    motivo: string,
    tipo: 'a' | 'c' | 'r',
    tarjeta : {
        nombre: string,
        tipo: 'd' | 'c'
    }
}

export type MovimientosBalanceFormType = z.infer<typeof movimientoBalanceSchema>;