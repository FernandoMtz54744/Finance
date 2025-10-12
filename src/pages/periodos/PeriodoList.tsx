import Timeline from "@/components/timeline/Timeline";
import TimelineItem from "@/components/timeline/TimelineItem";
import { dateToString, getFechaLimitePago, formatMXN } from "@/lib/utils";
import { usePeriodoStore } from "@/stores/periodoStore";
import { useTarjetaStore } from "@/stores/tarjetaStore";
import type { Periodo } from "@/types/periodo";
import { getTipoDescripcion } from "@/types/tarjeta";
import { useRouter } from "@tanstack/react-router";

type Props = {
    periodos: Periodo[]
}

export default function PeriodoList({ periodos }: Props) {

    const router = useRouter();
    const tarjeta = useTarjetaStore((state) => state.tarjeta);

    const setPeriodo = usePeriodoStore((state) => state.setPeriodo);

    const handleClick = (periodo: Periodo)=>{
        setPeriodo(periodo);
        router.navigate({ to: "/movimientos/$id", params: { id: periodo.id } });
    }


    return (<>
    <div className="text-center text-2xl font-medium">{tarjeta?.nombre} - {tarjeta?.tipo && getTipoDescripcion[tarjeta?.tipo]}</div>
    <Timeline>
        {periodos.map((periodo, i) => (
            <TimelineItem title={periodo.nombre} key={i} onClick={()=>handleClick(periodo)} className="hover:cursor-pointer">
                <div className="flex md:flex-row flex-col gap-x-5">
                    <div>Fecha inicio: {dateToString(new Date(periodo.fechaInicio))}</div>
                    <div>Corte: {dateToString(new Date(periodo.fechaCorte))}</div>
                    <div>Saldo inicial: {formatMXN(periodo.saldoInicial)}</div>
                    <div>Saldo final: {formatMXN(periodo.saldoFinal)}</div>
                    {tarjeta?.tipo === 'c' && <div>{dateToString(getFechaLimitePago(new Date(periodo.fechaCorte)))}</div>}
                </div>
            </TimelineItem>
        ))}

        <div onClick={() => router.navigate({ to: "/periodos/add"})} className="hover:cursor-pointer">
            <TimelineItem title="Agregar periodo">
                Click para agregar un periodo
            </TimelineItem>
        </div>
    </Timeline>
    </>)
}
