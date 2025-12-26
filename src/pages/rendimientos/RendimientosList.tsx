import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatMXN } from "@/lib/utils"
import type { Rendimiento } from "@/types/rendimiento"
import { DateTime } from "luxon"

type Params = {
    rendimientosPorMes: Record<string, Rendimiento[]>
}

export default function RendimientosList({rendimientosPorMes}: Params) {

  return (
    <Accordion collapsible type="single" className="w-full px-6">
        {Object.entries(rendimientosPorMes)
        .sort(([mesA], [mesB]) => mesA.localeCompare(mesB))
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
  
)}
