import { cn, dateToString, formatMXN, IsoToDate } from "@/lib/utils"
import { deleteMovimiento } from "@/services/movimientoService"
import { usePeriodoStore } from "@/stores/periodoStore"
import type { Movimiento } from "@/types/movimiento"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import ErrorPage from "../layouts/ErrorPage"

type Props = {
    movimientos: Movimiento[],
    title: string,
    bgColor: string
}

export default function MovimientosTable({movimientos, title, bgColor}: Props) {

  const queryClient = useQueryClient();
  const periodo = usePeriodoStore((state) => state.periodo);

  if(!periodo || !periodo.id){
    return <ErrorPage error={new Error("No se encontró el periodo")}></ErrorPage>
  }

  const deleteMovimientos = useMutation({
  mutationFn: (movimientoId: number) => deleteMovimiento(movimientoId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['movimientos', String(periodo.id)] });
  },
})

  return (
    <>
    <div className="text-center text-2xl font-medium my-2">{title}</div>
    {movimientos.sort((a,b) => IsoToDate(a.fecha).getTime() - IsoToDate(b.fecha).getTime()).map((movimiento, i) => (
        <div className="flex flex-row justify-between items-center border-b-2 border-b-gray-850 px-4 py-2" key={i}>
            <div>{dateToString(IsoToDate(movimiento.fecha))}</div>
            <div className="text-left w-full pl-4">{movimiento.motivo}</div>
            <div>{formatMXN(movimiento.cantidad)}</div>
            <Trash2 className="ml-2 hover:cursor-pointer hover:text-red-500" onClick={()=>deleteMovimientos.mutate(movimiento.id)}></Trash2>
        </div>
    ))}
    <div className={cn("flex flex-row justify-between mt-8 rounded-md py-2 px-4", bgColor)}>
      <div>Total:</div>
      <div>{formatMXN(movimientos.reduce((value, movimiento) => value + movimiento.cantidad, 0))}</div>
    </div>
    </>
  )
}
