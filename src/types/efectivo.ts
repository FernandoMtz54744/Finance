export const DENOMINACIONES = [50, 100, 200, 500, 1000] as const
export type Denominacion = typeof DENOMINACIONES[number]

export type Efectivo = {
    id: number,
    idUsuario: number,
    fecha: Date,
    denominaciones: Record<Denominacion, number>
}

export type EfectivoFormType = {denominaciones: Record<string, number>}