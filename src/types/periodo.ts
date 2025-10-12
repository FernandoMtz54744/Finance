import type { periodoSchema } from "@/validations/periodoSchema";
import { z } from "zod"

export type Periodo = {
    id: string
    idTarjeta: number,
    nombre: string,
    fechaInicio: Date,
    fechaCorte: Date,
    saldoInicial: number,
    saldoFinal: number,
    documento: string,
    validado: boolean
}

export type PeriodoFormType = z.infer<typeof periodoSchema>;