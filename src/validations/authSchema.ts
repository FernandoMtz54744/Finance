import { z } from "zod"

export const authSchema = z.object({
    correo: z.email({error: "Ingresa un email válido"}),
    password: z.string()
            .min(1, "Ingrese una contraseña válida")
})