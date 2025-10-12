import { dateToString, formatMXN, getFechaLimitePago } from "@/lib/utils"
import type { Movimiento } from "@/types/movimiento"
import type { Periodo } from "@/types/periodo"
import { getTipoDescripcion, type Tarjeta } from "@/types/tarjeta"

type Props = {
    periodo: Periodo,
    tarjeta: Tarjeta,
    movimientos: Movimiento[]
}

export default function MovimientosHeader({periodo, tarjeta, movimientos}: Props) {

  const getTotalPeriodo = () =>{
    return movimientos.reduce((total, movimiento)=>{
      return total + movimiento.cantidad;
    }, 0)
  }

  return (
    <div className="flex flex-col mx-8">
      <div className="flex flex-col md:flex-row items-center justify-between py-2">
        <div>{tarjeta.nombre} {getTipoDescripcion[tarjeta.tipo]} - {periodo.nombre}</div>
        <div>Fecha inicio: {dateToString(new Date(periodo.fechaInicio))}</div>
        <div>Fecha corte: {dateToString(new Date(periodo.fechaCorte))}</div>
        {tarjeta.tipo==='c' && <div>Fecha Límite de pago: {dateToString(getFechaLimitePago(new Date(periodo.fechaCorte)))}</div>}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around bg-emerald-950 py-1 rounded-md">
        <div>Saldo inicial: {formatMXN(periodo.saldoInicial)}</div>
        <div>Total periodo: {formatMXN(getTotalPeriodo())}</div>
        <div>Saldo final: {formatMXN(periodo.saldoInicial + getTotalPeriodo())}</div>
      </div>
    </div>
  )
}
