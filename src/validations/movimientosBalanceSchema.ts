import { z } from "zod"

export const movimientoBalanceSchema = z.object({
    fechaInicio: z.date(),
    fechaFin: z.date()
})