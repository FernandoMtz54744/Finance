import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { dateToString, formatMXN, IsoToDate } from "@/lib/utils"
import type { Efectivo } from "@/types/efectivo"
import type { Tarjeta } from "@/types/tarjeta"

type Params = {
    tarjetas: Tarjeta[],
    efectivo: Efectivo
}

export default function SaldoActual({ tarjetas, efectivo }: Params) {
  
    const totalTarjetas = tarjetas.reduce((suma, tarjeta)=>{
        return suma + (tarjeta.ultimoPeriodo?.saldoFinal ?? 0);
    }, 0)

    const totalEfectivo = Object.entries(efectivo.denominaciones ?? {}).reduce((sum, [den, cantidad]) => sum + Number(den) * cantidad, 0)

    return (
        <div className="px-8">
            {/* Tarjetas */}
            <Accordion  collapsible type="single" className="w-full">
                <AccordionItem value="tarjetas">
                    <AccordionTrigger className="hover:cursor-pointer hover:no-underline">
                        <div className="flex flex-row justify-between w-full">
                            <div>Tarjetas</div>
                            <div className="text-emerald-400">{formatMXN(totalTarjetas)}</div>
                        </div> 
                    </AccordionTrigger>
                    <AccordionContent>
                        {tarjetas.map(tarjeta => 
                            <div className="flex flex-row justify-between my-1" key={tarjeta.id}>
                                <div>{tarjeta.nombre}</div>
                                <div>{formatMXN(tarjeta.ultimoPeriodo?.saldoFinal ?? 0)}</div>
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Efectivo */}
            <Accordion  collapsible type="single" className="w-full">
                <AccordionItem value="efectivo" key={"efectivo"}>
                    <AccordionTrigger className="hover:cursor-pointer hover:no-underline" >
                        <div className="flex flex-row justify-between w-full">
                            <div>Efectivo ({dateToString(IsoToDate(efectivo.fecha))})</div>
                            <div className="text-emerald-400">{formatMXN(totalEfectivo)}</div>
                        </div> 
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col md:flex-row justify-between px-2">
                        {Object.entries(efectivo.denominaciones).map(([denominacion, cantidad], i) => 
                            <div className="flex flex-row justify-between" key={i}>
                                <div>${denominacion}<span className="text-emerald-500 text-xs">&nbsp;x{cantidad}</span>:</div>
                                <div>{formatMXN(Number(denominacion) * cantidad)}</div>
                            </div>
                            )}
                    </AccordionContent>
                </AccordionItem>  
            </Accordion> 

            <div className="flex flex-row justify-between bg-emerald-900 p-2 rounded-md mt-4 font-semibold">
                <div>Total </div>
                <div>{formatMXN(totalTarjetas+totalEfectivo)}</div>
            </div>
        </div>
    )
}
