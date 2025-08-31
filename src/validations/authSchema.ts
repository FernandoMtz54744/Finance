import { z } from "zod"

export const loginSchema = z.object({
    correo: z.email({error: "Ingresa un email válido"}),
    password: z.string()
            .min(1, "Ingrese una contraseña válida")
})

export const registerSchema = z.object({
    nombre: z.string()
            .min(1, "Ingresa un nombre")
            .max(10, "Ingresa un nombre más corto"),
    correo: z.email({error: "Ingresa un email válido"}),
    password: z.string()
            .min(1, "Ingrese una contraseña válida"),
    passwordRepeat: z.string()
}).refine((data) => data.password === data.passwordRepeat, {
  path: ['passwordRepeat'],
  message: 'Las contraseñas no coinciden',
});