import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import MovimientosForm from '@/pages/movimientos/MovimientosForm'
import MovimientosHeader from '@/pages/movimientos/MovimientosHeader';
import MovimientosList from '@/pages/movimientos/MovimientosList'
import { getMovimientos } from '@/services/movimientoService';
import { markAsValid, updateFile } from '@/services/periodoService';
import { usePeriodoStore } from '@/stores/periodoStore';
import { useTarjetaStore } from '@/stores/tarjetaStore';
import { getTipoDescripcion } from '@/types/tarjeta';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { CircleCheck, Eye, FileUp } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      if (!file){
        setIsLoadingFile(false);
        return;
      };
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
      if(data.link){
        const nuevoPeriodo = await updateFile(data.link, id);
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

  const validarPeriodo = async ()=>{
    try{
      const nuevoPeriodo = await markAsValid(id);
      setPeriodo(nuevoPeriodo);
      toast.success("Periodo marcado como válido");
    }catch(e){
      toast.success("No se pudo validar el periodo");
      console.log(e);
    }
  }

  return <>
    <MovimientosHeader periodo={periodo} tarjeta={tarjeta} movimientos={movimientos ?? []}/>
    {!periodo.validado && <MovimientosForm idPeriodo={id}/>}
    <MovimientosList movimientos={movimientos ?? []}/>
    {!periodo.validado && 
      <ConfirmDialog title='Validar periodo' confirmText='Aceptar' cancelText='Cancelar' confirmAction={validarPeriodo}
        description='¿Deseas marcar este periodo como válido?'>
        <CircleCheck className="fixed right-6 bottom-18 hover:cursor-pointer size-8"></CircleCheck>
      </ConfirmDialog>
    }
    {periodo.documento ? 
      <Eye className="fixed right-6 bottom-6 hover:cursor-pointer size-8" onClick={()=> window.open(periodo.documento, "_blank")}/>
      :  
      <>
      <FileUp className="fixed right-6 bottom-6 hover:cursor-pointer size-8" onClick={()=>fileInputRef.current?.click()}></FileUp>
      <input ref={fileInputRef} type="file" hidden onChange={subirEstadoCuenta} accept=".pdf"/>
      </>
    }
    </>  
}
