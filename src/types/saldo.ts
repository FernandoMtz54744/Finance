import type { Denominacion } from "./efectivo";

export type Saldo = {
  id: string,
  fecha: string;
  efectivo: Record<Denominacion, number>,
  tarjetas: [{
    nombre: string,
    tipo: 'c' | 'd',
    saldoFinal: number
  }]
};