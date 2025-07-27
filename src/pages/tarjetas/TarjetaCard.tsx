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

  return (
    <div onClick={() => router.navigate({ to: "/periodos/$id", params: { id: tarjeta.id } })} 
      className="w-2xs rounded-md p-4 space-y-3 hover:cursor-pointer"  
      style={{background: `linear-gradient(145deg, ${tarjeta.color}, #020024)`}}>

      <div className="flex flex-row justify-between">
        <div>{tarjeta.nombre}</div>
        <div>{tiposTarjeta[tarjeta.tipo]}</div>
      </div>

      <div className="flex flex-row justify-between">
        <div>
          <div className="text-xs">Fecha de corte:</div>
          <div>{tarjeta.diaCorte}</div>  
        </div>
        {tarjeta.tipo === 'c' &&
        <div>
          <div className="text-xs">F. Límite de pago:</div>
          <div>{tarjeta.diaCorte}</div>  
        </div>
        }
      </div>

      <div className="flex flex-col items-end">
        <div className="text-xs">Saldo final:</div>
        <div>0</div>
      </div>

    </div>
  )
}
