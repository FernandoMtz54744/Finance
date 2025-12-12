import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import MovimientosForm from '@/pages/movimientos/MovimientosForm'
import MovimientosHeader from '@/pages/movimientos/MovimientosHeader';
import MovimientosList from '@/pages/movimientos/MovimientosList'
import { getMovimientos } from '@/services/movimientoService';
import { getPeriodo, updateFile } from '@/services/periodoService';
import { usePeriodoStore } from '@/stores/periodoStore';
import { useTarjetaStore } from '@/stores/tarjetaStore';
import { getTipoDescripcion } from '@/types/tarjeta';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_auth/movimientos/$id')({
  component: RouteComponent,
})

function RouteComponent() {

  const id = Route.useParams().id; //idPeriodo
  const router = useRouter();
  const periodo = usePeriodoStore((state) => state.periodo);
  const setPeriodo = usePeriodoStore((state) => state.setPeriodo);
  const tarjeta = useTarjetaStore((state) => state.tarjeta);

  const [isLoadingFile, setIsLoadingFile] = useState(false); 

  if(!periodo || !tarjeta){
    router.navigate({to: "/tarjetas"})
    return;
  }

  const { data: movimientos, isLoading, error } = useQuery({
    queryKey: ['movimientos', id],
    queryFn: ()=> getMovimientos(id)
  });

  if (isLoading || isLoadingFile) return <LoadingPage/>;
  
  if (error) return <ErrorPage error={error} />;

  const subirEstadoCuenta = async (e: any)=>{
    try{
      setIsLoadingFile(true);
      const file = e.target.files?.[0];
      if (!file) return;
      const arrayBuffer = await file.arrayBuffer();
      const bytes = Array.from(new Uint8Array(arrayBuffer));
      const fileName = `${tarjeta.nombre} ${getTipoDescripcion[tarjeta.tipo]} - ${periodo.nombre}`;
      const response = await fetch("/api/subir-archivo",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: fileName,
          mime: file.type,
          bytes
        })
      });
      const data = await response.json();
      if(response.ok){
        updateFile(data.link, periodo.id);
        const [nuevoPeriodo] = await getPeriodo(periodo.id);
        setPeriodo(nuevoPeriodo);
        toast.success("Documento actualizado");
      }else{
        toast.error("Error al actualizar el enlace");
      }
    }catch(e){
      console.log(e);
      toast.error("Error al subir el documento");
    }finally{
      setIsLoadingFile(false);
    }
  }

  return <>
    <MovimientosHeader periodo={periodo} tarjeta={tarjeta} movimientos={movimientos ?? []}/>
    <MovimientosForm idPeriodo={id}/>
    <MovimientosList movimientos={movimientos ?? []} subirEstadoCuenta={subirEstadoCuenta} periodo={periodo}/>
    </>  
}
