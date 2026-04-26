import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatMXN } from "@/lib/utils"
import type { Rendimiento } from "@/types/rendimiento"
import { DateTime } from "luxon"
import LineTimeChart from "../graficas/LineTimeChart"

type Params = {
    rendimientosPorMes: Record<string, Rendimiento[]>
}

export default function RendimientosList({rendimientosPorMes}: Params) {

    const transformToChart = (data: Record<string, any[]>) => {
        return Object.entries(data)
        .map(([mes, movimientos]) => { 
            const total = movimientos.reduce((sum, mov) => sum + mov.cantidad,0);
            return {
                fecha: `${mes}-01`,
                rendimientos: total,
            };
        })
        .sort((a, b) => a.fecha.localeCompare(b.fecha));
    };

    const charData = transformToChart(rendimientosPorMes);

    console.log(charData)

    return (
    <>
    <Accordion collapsible type="single" className="w-full px-6">
        {Object.entries(rendimientosPorMes)
        .sort(([mesA], [mesB]) => mesB.localeCompare(mesA))
        .map(([mes, rendimientos]) => {
            const totalMes = rendimientos.reduce((sum, r) => sum + r.cantidad, 0);
            return( 
            <AccordionItem key={mes} value={mes}>
                <AccordionTrigger className="hover:cursor-pointer hover:no-underline">
                    <div className="flex flex-row justify-between w-full">
                        <div>{DateTime.fromISO(`${mes}-01`).toFormat("LLLL 'de' yyyy").replace(/^./, c => c.toUpperCase())}</div>
                        <div className="text-emerald-500">{formatMXN(totalMes)}</div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {rendimientos.map((rendimiento, i) => 
                        <div key={i} className="flex flex-row justify-between px-4 my-1">
                            <div>{rendimiento.periodo.tarjeta.nombre}</div>
                            <div>{formatMXN(rendimiento.cantidad)}</div>
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
    )})}
    </Accordion>
        <LineTimeChart data={charData} series={[{ key: "rendimientos", color: "#22C55E", name: "Rendimientos" }]}/>
    </>
)}
