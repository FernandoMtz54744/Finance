import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { dateToString, formatMXN, getFechaLimitePago, getNextFechaCorte, IsoToDate, isPendientePeriodoActual, isPeriodoPendienteValidacion } from "@/lib/utils";
import { useTarjetaStore } from "@/stores/tarjetaStore";
import type { Alerta } from "@/types/alerta";
import type { Tarjeta } from "@/types/tarjeta"
import { useRouter } from "@tanstack/react-router";
import { DateTime, Interval } from "luxon";

type Props = {
    tarjeta: Tarjeta
};

const tiposTarjeta = {
  c: "Crédito",
  d: "Débito",
};

export default function TarjetaCard({tarjeta}: Props) {
  const router = useRouter();
  const setTarjeta = useTarjetaStore((state) => state.setTarjeta);

  const handleClick = (tarjeta: Tarjeta)=>{
    setTarjeta(tarjeta);
    router.navigate({ to: "/periodos/$id", params: { id: tarjeta.id } });
  }

  const alertas: Alerta[] = [];
  const pendingValidation = tarjeta.ultimoPeriodo ? isPeriodoPendienteValidacion(tarjeta.ultimoPeriodo) : false;
  const pendingCurrentPeriod = isPendientePeriodoActual(tarjeta);
  
  if (pendingValidation) {
    alertas.push({
      tipo: "periodoPendiente",
      mensaje: "Falta validar el periodo",
      color: "bg-red-600",
    });
  }

  if (pendingCurrentPeriod) {
    alertas.push({
      tipo: "fueraDePeriodo",
      mensaje: "Falta agregar el periodo actual",
      color: "bg-red-600",
    });
  }

  return (
    <div onClick={ ()=> handleClick(tarjeta) } 
      className="relative w-2xs rounded-md p-4 space-y-3 hover:cursor-pointer"  
      style={{background: `linear-gradient(145deg, ${tarjeta.color}, #020024)`}}>

    {alertas.length > 0 && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={`
              absolute -top-2 -right-2.5
              min-w-5 h-5 px-1
              flex items-center justify-center
              text-[10px] font-semibold text-white
              rounded-full
              ${alertas[0].color}
            `}
          >
          {alertas.length}
        </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col">
              {alertas.map((alerta) => (
                <p key={alerta.tipo}>{alerta.mensaje}</p>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}

      <div className="flex flex-row justify-between">
        <div>{tarjeta.nombre}</div>
        <div>{tiposTarjeta[tarjeta.tipo]}</div>
      </div>

      <div className="flex flex-row justify-between">
        <div>
          <div className="text-xs">Fecha de corte:</div>
          <div>{dateToString(getNextFechaCorte(tarjeta.diaCorte))}</div>  
        </div>
        {tarjeta.tipo === 'c' &&
        <div>
          <div className="text-xs">F. Límite de pago:</div>
          <div>{dateToString(getFechaLimitePago(getNextFechaCorte(tarjeta.diaCorte)))}</div>  
        </div>
        }
      </div>

      <div className="flex flex-col items-end">
        <div className="text-xs">Saldo final:</div>
        <div>{formatMXN(tarjeta.ultimoPeriodo?.saldoFinal ?? 0)}</div>
      </div>

    </div>
  )
}
