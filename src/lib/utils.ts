import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateTime } from "luxon";
import type { Periodo } from "@/types/periodo";
import type { Tarjeta } from "@/types/tarjeta";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToString(fecha: Date){
  return DateTime.fromJSDate(fecha).toFormat("dd/LLL/yyyy");
} 

export function IsoToDate(fecha: string): Date{
  return DateTime.fromISO(fecha).toJSDate()
}

export function getFechaLimitePago(fechaCorte: Date){
  return DateTime.fromJSDate(fechaCorte).plus({days: 20}).toJSDate();
}

export function getNextFechaCorte(diaCorte: number): Date {
  const hoy = DateTime.now();

  //Se crea la fecha de corte en este mes
  let fechaCorte = hoy.set({ day: diaCorte });

  //Si ya pasó, se toma el mismo día del próximo mes
  if (fechaCorte < hoy) {
    fechaCorte = fechaCorte.plus({ months: 1 });
  }

  return fechaCorte.toJSDate();
}

export function formatMXN(cantidad: number){
  return new Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2
  }).format(cantidad);
}

// Valida si falta agregar un periodo actual
export function isPendientePeriodoActual(tarjeta: Tarjeta): boolean {
  const periodo = tarjeta?.ultimoPeriodo;
  if (!periodo?.fechaInicio || !periodo?.fechaCorte) return true;

  const hoy = DateTime.now().startOf("day");
  const inicio = DateTime.fromISO(periodo.fechaInicio).startOf("day");
  const corte = DateTime.fromISO(periodo.fechaCorte).startOf("day");

  return hoy < inicio || hoy > corte;
}