import { z } from "zod"

export const periodoSchema = z.object({
    fechaInicio: z.date(),
    fechaCorte: z.date(),
    nombre: z.string()
        .min(1, {error: "Ingresa un nombre de periodo"})
        .max(30, {error: "Ingresa un nombre más corto"}),
    saldoInicial: z.number()
        .min(0, { error: "Ingrese un saldo" })
})