import { useState } from "react";
import MovimientosBalanceTable from "./MovimientosBalanceTable";
import type { MovimientoBalance } from "@/types/movimientoBalance";

type Props = {
    movimientos: MovimientoBalance[]
}

export default function MovimientosBalanceList({movimientos}: Props) {
   
  const abonos = movimientos.filter(movimiento => movimiento.cantidad > 0);
  const cargos = movimientos.filter(movimiento => movimiento.cantidad < 0);
  const [tipoMovil, setTipoMovil] = useState<"abonos" | "cargos">("abonos");

  return (
    <>
    <div className="hidden md:grid grid-cols-12 px-8 gap-x-16 gap-y-16 my-8">
        <div className="col-span-6">
           <MovimientosBalanceTable movimientos={abonos} title="Abonos" bgColor="bg-emerald-900" />
        </div>

        <div className="col-span-6">
            <MovimientosBalanceTable movimientos={cargos} title="Cargos" bgColor="bg-red-900" />
        </div>
    </div>
    
    {/* Mobile  */}
    <div className="md:hidden px-4 mt-6 mb-8">
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setTipoMovil("abonos")} 
          className={`px-4 py-2 rounded bg-emerald-900  ${tipoMovil !== "abonos" && "opacity-50"}`}>
            Abonos
        </button>
    
        <button onClick={() => setTipoMovil("cargos")}
          className={`px-4 py-2 rounded bg-red-900 ${tipoMovil !== "cargos" && "opacity-50"}`}>
            Cargos
        </button>
      </div>

      <MovimientosBalanceTable movimientos={tipoMovil === "abonos" ? abonos : cargos}
        title={tipoMovil === "abonos" ? "Abonos" : "Cargos"}
        bgColor={tipoMovil === "abonos" ? "bg-emerald-900" : "bg-red-900"}
      />
    </div>
  </>
)}
