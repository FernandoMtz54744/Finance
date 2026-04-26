import { cn, dateToString, formatMXN, IsoToDate } from "@/lib/utils"
import { deleteMovimiento } from "@/services/movimientoService"
import { usePeriodoStore } from "@/stores/periodoStore"
import type { Movimiento } from "@/types/movimiento"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowLeftRight, BanknoteArrowUp, Pencil, Trash2 } from "lucide-react"
import ErrorPage from "../layouts/ErrorPage"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import MovimientosForm from "./MovimientosForm"
import { useTarjetaStore } from "@/stores/tarjetaStore"
import { CustomIcon } from "@/components/icon/CustomIcon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Props = {
    movimientos: Movimiento[],
    title: string,
    bgColor: string
}

export default function MovimientosTable({movimientos, title, bgColor}: Props) {

  const queryClient = useQueryClient();
  const periodo = usePeriodoStore((state) => state.periodo);
  const tarjeta = useTarjetaStore((state) => state.tarjeta);
  const [movimientoSeleccionado, setMovimientoSeleccionado] = useState<Movimiento | null>(null);
  const [open, setOpen] = useState(false);

  if(!periodo || !periodo.id){
    return <ErrorPage error={new Error("No se encontró el periodo")}></ErrorPage>
  }

  if(!tarjeta){
    return <ErrorPage error={new Error("No se encontró la tarjeta")}></ErrorPage>
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
      <ContextMenu>
        <ContextMenuTrigger>
          {/* DESKTOP */}
          <div className="hidden md:flex flex-row justify-between items-center border-b-2 border-b-gray-850 px-4 py-2 selec select-none" key={i}>
              <div>{dateToString(IsoToDate(movimiento.fecha))}</div>
              <div className="text-left w-full pl-4 flex flex-row">
                {movimiento.motivo} 
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
          {/* MOBILE */}
          <div className="md:hidden border-b border-b-gray-800 px-4 py-3 select-none">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CustomIcon name={movimiento.categoria.icono} size="1em"/>
                  <span className="font-medium truncate">{movimiento.motivo}</span>

                  {movimiento.tipo === "r" && (
                    <BanknoteArrowUp className="text-emerald-400 h-4 w-4 shrink-0" />
                  )}

                  {movimiento.tipo === "t" && (
                    <ArrowLeftRight className="text-blue-400 h-4 w-4 shrink-0" />
                  )}
                </div>

                <div className="text-sm text-gray-400 mt-1">
                  {dateToString(IsoToDate(movimiento.fecha))}
                  {" • "}
                  {movimiento.categoria.descripcion}
                </div>
              </div>

              <div className="text-right font-semibold whitespace-nowrap">
                {formatMXN(movimiento.cantidad)}
              </div>
            </div>
          </div>
          
        </ContextMenuTrigger>
        {!periodo.validado && <ContextMenuContent>
          <ContextMenuItem className="hover:cursor-pointer"
              onClick={() => {setMovimientoSeleccionado(movimiento); setOpen(true);}}>
            Editar <Pencil className="ml-1 text-blue-500"/>
          </ContextMenuItem>
          <ContextMenuItem className="hover:cursor-pointer"
              onClick={()=>deleteMovimientos.mutate(movimiento.id)}>
            Eliminar<Trash2 className="ml-1 text-red-500"/>
          </ContextMenuItem>
        </ContextMenuContent>
        }
      </ContextMenu>
    ))}
    <div className={cn("flex flex-row justify-between mt-8 rounded-md py-2 px-4", bgColor)}>
      <div>Total:</div>
      <div>{formatMXN(movimientos.reduce((value, movimiento) => value + movimiento.cantidad, 0))}</div>
    </div>

    {/* Modal de edición */}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95vw] max-w-none sm:max-w-none">
        <DialogHeader>
          <DialogTitle>Editar movimiento</DialogTitle>
        </DialogHeader>

        {movimientoSeleccionado && (
          <MovimientosForm
            idPeriodo={String(periodo.id)}
            periodo={periodo}
            tarjeta={tarjeta}
            initialData={movimientoSeleccionado}
            modo="editar"
            setOpen={setOpen}
          />
        )}
      </DialogContent>
    </Dialog>
    </>
  )
}
