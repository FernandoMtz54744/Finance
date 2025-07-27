export type Tarjeta = {
    id: string
    nombre: string,
    tipo: 'c' | 'd',
    diaCorte: number,
    correo: string,
    color: string
}