import { z } from "zod"

export const movimientoSchema = z.object({
    fecha: z.date({
        error: "Ingresa una fecha"
    }),
    tipo: z.enum(['c', 'a', 'r']), //m: Movimiento (engloba cargo y abono), r: rendimiento
    cantidad: z.number()
        .refine(val => val !== 0, { message: "Ingresa una cantidad" }),
    motivo: z.string()
        .min(1, "Ingresa un motivo")
        .max(50, "Ingresa un motivo más corto")
})