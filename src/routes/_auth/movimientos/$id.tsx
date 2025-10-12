import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import MovimientosForm from '@/pages/movimientos/MovimientosForm'
import MovimientosHeader from '@/pages/movimientos/MovimientosHeader';
import MovimientosList from '@/pages/movimientos/MovimientosList'
import { getMovimientos } from '@/services/movimientoService';
import { usePeriodoStore } from '@/stores/periodoStore';
import { useTarjetaStore } from '@/stores/tarjetaStore';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/movimientos/$id')({
  component: RouteComponent,
})

function RouteComponent() {

  const id = Route.useParams().id; //idPeriodo
  const router = useRouter();
  const periodo = usePeriodoStore((state) => state.periodo);
  const tarjeta = useTarjetaStore((state) => state.tarjeta);

  if(!periodo || !tarjeta){
    router.navigate({to: "/tarjetas"})
    return;
  }

  const { data: movimientos, isLoading, error } = useQuery({
    queryKey: ['movimientos', id],
    queryFn: ()=> getMovimientos(id)
  });

  if (isLoading) return <LoadingPage/>;
  
  if (error) return <ErrorPage error={error} />;

  return <>
    <MovimientosHeader periodo={periodo} tarjeta={tarjeta} movimientos={movimientos ?? []}/>
    <MovimientosForm idPeriodo={id}/>
    <MovimientosList movimientos={movimientos ?? []}/>
  </>
}
