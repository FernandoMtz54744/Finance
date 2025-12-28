import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { dateToString, formatMXN, IsoToDate } from "@/lib/utils"
import type { Saldo } from "@/types/saldo"
import { getTipoDescripcion } from "@/types/tarjeta"

type Props = {
    saldos: Saldo[]
}

export default function SaldoList({saldos}: Props) {
  return (
    <Accordion  collapsible type="single" className="w-full px-8">
        {saldos.map(saldo => {
            const totalTarjetas = saldo.tarjetas.reduce((suma, tarjeta)=>{
                return suma + (tarjeta.saldoFinal);
            }, 0);

            const totalEfectivo = Object.entries(saldo.efectivo ?? {}).reduce((sum, [den, cantidad]) => sum + Number(den) * cantidad, 0);

            return (<AccordionItem value={saldo.id}>
                <AccordionTrigger className="hover:cursor-pointer hover:no-underline">
                        <div className="flex flex-row justify-between w-full">
                            <div>{dateToString(IsoToDate(saldo.fecha))}</div>
                            <div className="text-emerald-400">{formatMXN(totalTarjetas + totalEfectivo)}</div>
                        </div> 
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-row justify-between font-semibold text-emerald-400">
                            <div>Tarjetas</div>
                            <div>{formatMXN(totalTarjetas)}</div>
                        </div>
                        {saldo.tarjetas.map((tarjeta, i) => 
                            <div className="flex flex-row justify-between my-1 pl-4" key={i}>
                                <div>{`${tarjeta.nombre} ${getTipoDescripcion[tarjeta.tipo]}`}</div>
                                <div>{formatMXN(tarjeta.saldoFinal ?? 0)}</div>
                            </div>
                        )}
                        <div className="flex flex-row justify-between font-semibold text-emerald-400 mt-2">
                            <div>Efectivo</div>
                            <div>{formatMXN(totalEfectivo)}</div>
                        </div>
                        {Object.entries(saldo.efectivo).map(([denominacion, cantidad], i) => 
                            <div className="flex flex-row justify-between my-1 pl-4" key={i}>
                                <div>${denominacion}<span className="text-emerald-500 text-xs">&nbsp;x{cantidad}</span>:</div>
                                <div>{formatMXN(Number(denominacion) * cantidad)}</div>
                            </div>
                        )}
                    </AccordionContent>

            </AccordionItem>

            )}
        )}
    </Accordion>
  )
}
