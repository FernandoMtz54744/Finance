import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { dateToString, formatMXN, IsoToDate } from "@/lib/utils";
import type { Efectivo } from "@/types/efectivo";
import { useState } from "react"

type Props = {
    data: Efectivo[]
}

export default function EfectivoList({data}: Props) {
    const [visibleCount, setVisibleCount] = useState(5);
  return (
    <>
    <div className="flex flex-row justify-center px-8 mb-4">
        <Accordion collapsible type="single" className="w-full">
            {data.slice(0, visibleCount).map((efectivo, i) => {
            const total = Object.entries(efectivo.denominaciones ?? {}).reduce((sum, [den, cantidad]) => sum + Number(den) * cantidad, 0)
            return  <AccordionItem value={`efectivo-${i}`} key={i}>
                        <AccordionTrigger className="hover:cursor-pointer">
                            <div className="flex flex-row justify-between w-full">
                                <div>Efectivo del {dateToString(IsoToDate(efectivo.fecha))}</div>
                                <div>{formatMXN(total)}</div>
                            </div> 
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col md:flex-row justify-between px-2">
                            {Object.entries(efectivo.denominaciones).map(([denominacion, cantidad], i) => 
                                <div className="flex flex-row justify-between" key={i}>
                                    <div>${denominacion}<span className="text-emerald-500 text-xs">&nbsp;x{cantidad}</span>:</div>
                                    <div>
                                         {formatMXN(Number(denominacion) * cantidad)}
                                    </div>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                }
              
            )}
        </Accordion>
    </div>
    {visibleCount < data.length && (
            <div className="flex justify-center mb-8">
                <button onClick={() => setVisibleCount(prev => prev + 5)}
                    className="px-4 py-2 rounded-md bg-emerald-800 text-white hover:cursor-pointer"
                >
                    Ver más
                </button>
            </div>
        )}
    </>
  )
}
