import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import EstadisticaHistorico from "@/pages/estadisticas/EstadisticaHistorico";
import EstadisticaMensual from "@/pages/estadisticas/EstadisticaMensual";
import ErrorPage from "@/pages/layouts/ErrorPage";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute('/_auth/estadisticas/')({
  component: RouteComponent,
})

function RouteComponent() {

  const usuario = useAuthStore((state) => state.user);

  if(!usuario) return <ErrorPage error={new Error("No se encontró al usuario")}/>

  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);
  const [tipoEstadistica, setTipoEstadistica] = useState<"mensual" | "historico">("mensual")

  return (
  <div>
    <div className="flex flex-col md:flex-row items-center md:justify-end gap-2 mx-8 mt-4">
      <Label htmlFor="count-transferencia" className='hover:cursor-pointer'>Mostrar transferencias</Label>
      <Switch id="count-transferencia" checked={mostrarTransferencias} onCheckedChange={setMostrarTransferencias} className='hover:cursor-pointer'/>
    </div>

    <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => setTipoEstadistica("mensual")} 
          className={`px-4 py-2 rounded bg-blue-900  ${tipoEstadistica !== "mensual" && "opacity-50"} hover:cursor-pointer`}>
            Mensual
        </button>

        <button onClick={() => setTipoEstadistica("historico")}
          className={`px-4 py-2 rounded bg-blue-900 ${tipoEstadistica !== "historico" && "opacity-50"} hover:cursor-pointer`}>
            Histórico
        </button>
    </div>

    {tipoEstadistica === "mensual" ? 
      <EstadisticaMensual usuario={usuario} mostrarTransferencias={mostrarTransferencias}/> 
      : <EstadisticaHistorico/>}

  </div>
  )
}
