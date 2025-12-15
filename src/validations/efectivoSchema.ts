import { z } from "zod"

export const efectivoSchema = z.object({
  denominaciones: z.record(
    z.string(),
    z.number().int().min(0, "No puedes ingresar cantidades negativas")
  )
})