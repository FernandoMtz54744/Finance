import type { movimientoBalanceSchema } from "@/validations/movimientosBalanceSchema";
import type z from "zod";
import type { Categoria } from "./categoria";

export type MovimientoBalance = {
    id: number,
    fecha: string,
    cantidad: number,
    motivo: string,
    tipo: 'a' | 'c' | 'r' | 't',
    tarjeta : {
        nombre: string,
        tipo: 'd' | 'c'
    },
    categoria: Categoria
}

export type MovimientosBalanceFormType = z.infer<typeof movimientoBalanceSchema>;