import { z } from "zod"

export const fechaInicioFinSchema = z.object({
    fechaInicio: z.date(),
    fechaFin: z.date()
})