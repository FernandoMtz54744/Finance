import { cn, dateToString, formatMXN, IsoToDate } from "@/lib/utils"
import { ArrowLeftRight, BanknoteArrowUp } from "lucide-react"
import type { MovimientoBalance } from "@/types/movimientoBalance"
import { getTipoDescripcion } from "@/types/tarjeta"
import { CustomIcon } from "@/components/icon/CustomIcon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Props = {
    movimientos: MovimientoBalance[],
    bgColor: string,
}

export default function MovimientosBalanceTable({movimientos, bgColor}: Props) {

  return (
    <>
    {movimientos.sort((a,b) => IsoToDate(a.fecha).getTime() - IsoToDate(b.fecha).getTime()).map((movimiento, i) => (
      <div className="flex flex-row justify-between items-center border-b-2 border-b-gray-850 px-4 py-2" key={i}>
        <div>{dateToString(IsoToDate(movimiento.fecha))}</div>
        <div className="text-left w-full pl-4 flex flex-row">
          {movimiento.motivo} [{movimiento.tarjeta.nombre} {getTipoDescripcion[movimiento.tarjeta.tipo]}]
          {movimiento.tipo === "r" && <BanknoteArrowUp className="text-emerald-400 ml-2"/>}
          {movimiento.tipo === "t" && <ArrowLeftRight className="text-blue-400 ml-2"/>}
        </div>
        <div>{formatMXN(movimiento.cantidad)}</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-2">
                <CustomIcon name={movimiento.categoria.icono} size="1em"/>
              </div>
            </TooltipTrigger>
              <TooltipContent> {movimiento.categoria.descripcion} </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </div>
    ))}
    <div className={cn("flex flex-row justify-between mt-8 rounded-md py-2 px-4", bgColor)}>
      <div>Total:</div>
      <div>{formatMXN(movimientos.reduce((value, movimiento) => value + movimiento.cantidad, 0))}</div>
    </div>
    </>
  )
}
