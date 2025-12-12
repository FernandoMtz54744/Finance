import type { Movimiento } from "@/types/movimiento"
import MovimientosTable from "./MovimientosTable";

type Props = {
    movimientos: Movimiento[]
}

export default function MovimientosList({movimientos}: Props) {
   
  const abonos = movimientos.filter(movimiento => ['a', 'r'].includes(movimiento.tipo));
  const cargos = movimientos.filter(movimiento => movimiento.tipo === 'c');
  

  return (
    <div className="grid grid-cols-12 px-8 md:gap-x-16 gap-y-16 my-8">
        <div className="col-span-12 md:col-span-6">
           <MovimientosTable movimientos={abonos} title="Abonos" bgColor="bg-emerald-900"/>
        </div>

        <div className="col-span-12 md:col-span-6">
            <MovimientosTable movimientos={cargos} title="Cargos" bgColor="bg-red-900"/>
        </div>
    </div>
  )
}
