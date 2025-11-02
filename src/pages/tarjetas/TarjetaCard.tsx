import { dateToString, formatMXN, getFechaLimitePago, getNextFechaCorte } from "@/lib/utils";
import { useTarjetaStore } from "@/stores/tarjetaStore";
import type { Tarjeta } from "@/types/tarjeta"
import { useRouter } from "@tanstack/react-router";

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

  return (
    <div onClick={ ()=> handleClick(tarjeta) } 
      className="w-2xs rounded-md p-4 space-y-3 hover:cursor-pointer"  
      style={{background: `linear-gradient(145deg, ${tarjeta.color}, #020024)`}}>

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
