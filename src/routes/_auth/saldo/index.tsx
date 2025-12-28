import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { Separator } from '@/components/ui/separator';
import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import SaldoActual from '@/pages/saldo/SaldoActual';
import SaldoList from '@/pages/saldo/SaldoList';
import { getLastEfectivo } from '@/services/efectivoService';
import { getSaldos, insertSaldo } from '@/services/saldosService';
import { getTarjetasConUltimoPeriodo } from '@/services/tarjetaService';
import { useAuthStore } from '@/stores/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_auth/saldo/')({
  component: RouteComponent,
})

function RouteComponent() {

  const usuario = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: efectivo, isLoading: isLoadingEfectivo, error: errorEfectivo } = useQuery({
    queryKey: ['saldoEfectivo'],
    queryFn: ()=> getLastEfectivo(usuario!.id),
    enabled: !!usuario
  });

  const { data: tarjetas, isLoading: isLoadingTarjetas, error: errorTarjetas } = useQuery({
    queryKey: ['saldoTarjetas'],
    queryFn: ()=> getTarjetasConUltimoPeriodo(usuario!.id),
    enabled: !!usuario
  });

  const { data: saldos, isLoading: isLoadingSaldos, error: errorSaldos } = useQuery({
    queryKey: ['saldos'],
    queryFn: ()=> getSaldos(usuario!.id),
    enabled: !!usuario
  });

  const mutation = useMutation({
    mutationFn: insertSaldo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saldos'] });
    },
    onError: (e) => {
      toast.error("No se pudo agregar el movimiento");
      console.log(e.message);
    },
  });

  if(isLoadingEfectivo || isLoadingTarjetas || isLoadingSaldos) return <LoadingPage/>;

  const error = errorEfectivo || errorTarjetas || errorSaldos;
  if(error) return <ErrorPage error={error}/>

  return <>
    <SaldoActual tarjetas={tarjetas ?? []} efectivo={efectivo ?? {}}/>
    <Separator className='my-8'/>
    <SaldoList saldos={saldos ?? []}/>
    <ConfirmDialog title='Guardar saldo actual' confirmText='Aceptar' cancelText='Cancelar' confirmAction={()=> mutation.mutate({tarjetas,efectivo})}
      description='¿Deseas guardar el estado actual del saldo?'>
      <Camera className="fixed right-6 bottom-6 hover:cursor-pointer size-8"/>
    </ConfirmDialog>
  </>
}
