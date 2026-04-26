import { cn, dateToString, formatMXN, IsoToDate } from "@/lib/utils"
import { ArrowLeftRight, BanknoteArrowUp } from "lucide-react"
import type { MovimientoBalance } from "@/types/movimientoBalance"
import { getTipoDescripcion } from "@/types/tarjeta"
import { CustomIcon } from "@/components/icon/CustomIcon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { COLORS } from "@/types/categoria"
import { useSelectedCategoriaStore } from "@/stores/selectedCategoriaStore"

type Props = {
    movimientos: MovimientoBalance[],
    bgColor: string,
}

export default function MovimientosBalanceTable({movimientos, bgColor}: Props) {

  const selectedCategoriaId = useSelectedCategoriaStore((state) => state.selectedCategoriaId);

  return (
    <>
  {movimientos.sort((a, b) => IsoToDate(a.fecha).getTime() - IsoToDate(b.fecha).getTime()) .map((movimiento, i) => {
      const isSelected = selectedCategoriaId == null || selectedCategoriaId === movimiento.categoria.idCategoria;

      return (
        <div key={i}>
          {/* Desktop */}
          <div className={cn("hidden md:flex flex-row justify-between items-center border-b border-b-gray-800 px-4 py-2 select-none",
              isSelected ? "opacity-100" : "opacity-50"
            )}
          >
          <div className="w-32 shrink-0"> {dateToString(IsoToDate(movimiento.fecha))}</div>
            <div className="flex-1 pl-4 flex items-center gap-2 min-w-0">
              <span className="truncate">
                {movimiento.motivo} [{movimiento.tarjeta.nombre}{" "}
                {getTipoDescripcion[movimiento.tarjeta.tipo]}]
              </span>

              {movimiento.tipo === "r" && (
                <BanknoteArrowUp className="text-emerald-400 h-4 w-4 shrink-0" />
              )}

              {movimiento.tipo === "t" && (
                <ArrowLeftRight className="text-blue-400 h-4 w-4 shrink-0" />
              )}
            </div>

            <div className="w-32 text-right font-medium shrink-0">
              {formatMXN(movimiento.cantidad)}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="ml-3 shrink-0">
                    <CustomIcon
                      name={movimiento.categoria.icono}
                      size="1em"
                      color={ selectedCategoriaId === movimiento.categoria.idCategoria
                          ? COLORS[movimiento.categoria.idCategoria - 1]
                          : "white"
                      }
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {movimiento.categoria.descripcion}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Mobile */}
          <div
            className={cn("md:hidden border-b border-b-gray-800 px-4 py-3 select-none",
              isSelected ? "opacity-100" : "opacity-50"
            )}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CustomIcon
                    name={movimiento.categoria.icono}
                    size="1em"
                    color={
                      selectedCategoriaId ===
                      movimiento.categoria.idCategoria
                        ? COLORS[movimiento.categoria.idCategoria - 1]
                        : "white"
                    }
                  />

                  <span className="font-medium truncate">
                    {movimiento.motivo}
                  </span>

                  {movimiento.tipo === "r" && (
                    <BanknoteArrowUp className="text-emerald-400 h-4 w-4 shrink-0" />
                  )}

                  {movimiento.tipo === "t" && (
                    <ArrowLeftRight className="text-blue-400 h-4 w-4 shrink-0" />
                  )}
                </div>

                <div className="text-sm text-gray-400 mt-1 truncate">
                  {movimiento.tarjeta.nombre}{" "}
                  {getTipoDescripcion[movimiento.tarjeta.tipo]}
                </div>

                <div className="text-sm text-gray-400">
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
        </div>
      );
    })}

  <div
    className={cn(
      "flex justify-between mt-6 rounded-md py-3 px-4 font-semibold",
      bgColor
    )}
  >
    <span>Total</span>
    <span>
      {formatMXN(
        movimientos.reduce(
          (value, movimiento) => value + movimiento.cantidad,
          0
        )
      )}
    </span>
  </div>
</>
  )
}
