import { useState } from "react";
import MovimientosBalanceTable from "./MovimientosBalanceTable";
import type { MovimientoBalance } from "@/types/movimientoBalance";
import PieCategoriasChart from "../graficas/PieCategoriasChart";

type Props = {
    movimientos: MovimientoBalance[],
    graficasOnly: boolean
}

export default function MovimientosBalanceList({movimientos, graficasOnly}: Props) {
   
  const abonos = movimientos.filter(movimiento => movimiento.cantidad > 0);
  const cargos = movimientos.filter(movimiento => movimiento.cantidad < 0);
  const [tipoMovil, setTipoMovil] = useState<"abonos" | "cargos">("abonos");

  return (
    <>
    <div className="hidden md:grid grid-cols-12 px-8 gap-x-16 gap-y-16 my-8">
        <div className="col-span-6">
          <div className="text-center text-2xl font-medium my-2">Abonos</div>
           {!graficasOnly && <MovimientosBalanceTable movimientos={abonos} bgColor="bg-emerald-900" />}
           <PieCategoriasChart data={abonos.map(mov => ({
            idCategoria: mov.categoria.idCategoria, 
            categoria: mov.categoria.descripcion, 
            cantidad: mov.cantidad
            }))} />
        </div>

        <div className="col-span-6">
          <div className="text-center text-2xl font-medium my-2">Cargos</div>
          {!graficasOnly && <MovimientosBalanceTable movimientos={cargos} bgColor="bg-red-900" />}
          <PieCategoriasChart data={cargos.map(mov => ({
            idCategoria: mov.categoria.idCategoria, 
            categoria: mov.categoria.descripcion, 
            cantidad: mov.cantidad
            }))} />
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

      {<div className="text-center text-2xl font-medium my-2">{tipoMovil === "abonos" ? "Abonos" : "Cargos"}</div>}
      {!graficasOnly && <MovimientosBalanceTable movimientos={tipoMovil === "abonos" ? abonos : cargos}
        bgColor={tipoMovil === "abonos" ? "bg-emerald-900" : "bg-red-900"}
      />}
      <PieCategoriasChart data={(tipoMovil === "abonos" ? abonos : cargos).map(mov => ({
        idCategoria: mov.categoria.idCategoria, 
        categoria: mov.categoria.descripcion, 
        cantidad: mov.cantidad
        }))} />
    </div>
  </>
)}
