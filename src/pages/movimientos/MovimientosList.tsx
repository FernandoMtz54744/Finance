import type { Movimiento } from "@/types/movimiento"
import MovimientosTable from "./MovimientosTable";
import { Eye, FileUp } from "lucide-react";
import { useRef } from "react";
import type { Periodo } from "@/types/periodo";

type Props = {
    movimientos: Movimiento[],
    subirEstadoCuenta: (e:any) => void,
    periodo: Periodo
}

export default function MovimientosList({movimientos, subirEstadoCuenta, periodo}: Props) {
   
  const abonos = movimientos.filter(movimiento => ['a', 'r'].includes(movimiento.tipo));
  const cargos = movimientos.filter(movimiento => movimiento.tipo === 'c');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (<>
    <div className="grid grid-cols-12 px-8 md:gap-x-16 gap-y-16 my-8">
        <div className="col-span-12 md:col-span-6">
           <MovimientosTable movimientos={abonos} title="Abonos" bgColor="bg-emerald-900"/>
        </div>

        <div className="col-span-12 md:col-span-6">
            <MovimientosTable movimientos={cargos} title="Cargos" bgColor="bg-red-900"/>
        </div>
    </div>
    {periodo.documento ? 
      <Eye className="fixed right-6 bottom-6 hover:cursor-pointer size-8" onClick={()=> window.open(periodo.documento, "_blank")}/>
      :  
      <>
      <FileUp className="fixed right-6 bottom-6 hover:cursor-pointer size-8" onClick={()=>fileInputRef.current?.click()}></FileUp>
      <input ref={fileInputRef} type="file" hidden onChange={subirEstadoCuenta} accept=".pdf"/>
      </>
    }
    </>
  )
}
