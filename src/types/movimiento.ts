export type Movimiento = {
    id: number,
    idPeriodo: number,
    fecha: Date,
    cantidad: number,
    motivo: string,
    tipo: 'a' | 'c' | 'r' //[Abono, Cargo, Rendimiento]
}