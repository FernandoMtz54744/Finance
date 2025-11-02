import type { tarjetaSchema } from "@/validations/tarjetaSchema";
import { z } from "zod"
import type { Periodo } from "./periodo";

export type Tarjeta = {
    id: string
    nombre: string,
    tipo: 'c' | 'd',
    diaCorte: number,
    correo: string,
    color: string,
    ultimoPeriodo?: Periodo
}

export type TarjetaFormType = z.infer<typeof tarjetaSchema>;

export const getTipoDescripcion: Record<'c' | 'd', string> = {
  c: 'Crédito',
  d: 'Débito',
};
