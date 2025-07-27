import { z } from "zod"

export const tarjetaSchema = z.object({
    nombre: z.string()
    .min(1, {error: "Ingresa un nombre de tarjeta"})
    .max(30, {error: "Ingresa un nombre más corto"}),
    tipo: z.enum(['d', 'c']),
    diaCorte: z.number()
        .min(1, { error: "Ingrese un día mayor a 0" })
        .max(31, { error: "Ingrese un día menor a 31" }),
    correo: z.email({error: "Ingresa un email válido"}),
    color: z.string()
        .refine(color => color.toUpperCase() !== "#FFFFFF" && color !== "#000000", {error: "Selecciona un color"})

})