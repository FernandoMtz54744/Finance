import { cn, dateToString, formatMXN, IsoToDate } from "@/lib/utils"
import { ArrowLeftRight, BanknoteArrowUp } from "lucide-react"
import type { MovimientoBalance } from "@/types/movimientoBalance"
import { getTipoDescripcion } from "@/types/tarjeta"

type Props = {
    movimientos: MovimientoBalance[],
    title: string,
    bgColor: string,
}

export default function MovimientosBalanceTable({movimientos, title, bgColor}: Props) {

  return (
    <>
    <div className="text-center text-2xl font-medium my-2">{title}</div>
    {movimientos.sort((a,b) => IsoToDate(a.fecha).getTime() - IsoToDate(b.fecha).getTime()).map((movimiento, i) => (
      <div className="flex flex-row justify-between items-center border-b-2 border-b-gray-850 px-4 py-2" key={i}>
        <div>{dateToString(IsoToDate(movimiento.fecha))}</div>
        <div className="text-left w-full pl-4 flex flex-row">
          {movimiento.motivo} - {movimiento.tarjeta.nombre} {getTipoDescripcion[movimiento.tarjeta.tipo]}
          {movimiento.tipo === "r" && <BanknoteArrowUp className="text-emerald-400 ml-2"/>}
          {movimiento.tipo === "t" && <ArrowLeftRight className="text-blue-400 ml-2"/>}
        </div>
        <div>{formatMXN(movimiento.cantidad)}</div>
      </div>
    ))}
    <div className={cn("flex flex-row justify-between mt-8 rounded-md py-2 px-4", bgColor)}>
      <div>Total:</div>
      <div>{formatMXN(movimientos.reduce((value, movimiento) => value + movimiento.cantidad, 0))}</div>
    </div>
    </>
  )
}
