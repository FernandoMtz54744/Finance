import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { dateToString, formatMXN } from "@/lib/utils";
import type { Efectivo } from "@/types/efectivo";

type Props = {
    data: Efectivo[]
}

export default function EfectivoList({data}: Props) {
  return (
    <div className="flex flex-row justify-center px-8">
        <Accordion collapsible type="single" className="w-full">
            {data.map((efectivo, i) => {
            const total = Object.entries(efectivo.denominaciones ?? {}).reduce((sum, [den, cantidad]) => sum + Number(den) * cantidad, 0)
            return  <AccordionItem value={`efectivo-${i}`} key={i}>
                        <AccordionTrigger className="hover:cursor-pointer">
                            <div className="flex flex-row justify-between w-full">
                                <div>Efectivo del {dateToString(new Date(efectivo.fecha))}</div>
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
  )
}
