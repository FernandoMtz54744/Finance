import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import SaldoActual from '@/pages/saldo/SaldoActual';
import { getLastEfectivo } from '@/services/efectivoService';
import { getTarjetasConUltimoPeriodo } from '@/services/tarjetaService';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/saldo/')({
  component: RouteComponent,
})

function RouteComponent() {
  const usuario = useAuthStore((state) => state.user);

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

  if(isLoadingEfectivo || isLoadingTarjetas) return <LoadingPage/>;

  if(errorEfectivo) return <ErrorPage error={errorEfectivo}/>
  
  if(errorTarjetas) return <ErrorPage error={errorTarjetas}/>


  return <>
    <SaldoActual tarjetas={tarjetas ?? []} efectivo={efectivo ?? {}}/>
  </>
}
