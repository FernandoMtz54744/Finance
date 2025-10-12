import { cn, dateToString, formatMXN } from "@/lib/utils"
import type { Movimiento } from "@/types/movimiento"

type Props = {
    movimientos: Movimiento[],
    title: string,
    bgColor: string
}

export default function MovimientosTable({movimientos, title, bgColor}: Props) {
  return (
    <>
    <div className="text-center text-2xl font-medium my-2">{title}</div>
    {movimientos.map(movimiento => (
        <div className="flex flex-row justify-between items-center border-b-2 border-b-gray-850 px-4 py-2">
            <div>{dateToString(new Date(movimiento.fecha))}</div>
            <div className="text-left w-full pl-4">{movimiento.motivo}</div>
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
