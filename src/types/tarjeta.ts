import type { tarjetaSchema } from "@/validations/tarjetaSchema";
import { z } from "zod"

export type Tarjeta = {
    id: string
    nombre: string,
    tipo: 'c' | 'd',
    diaCorte: number,
    correo: string,
    color: string
}

export type TarjetaFormType = z.infer<typeof tarjetaSchema>;