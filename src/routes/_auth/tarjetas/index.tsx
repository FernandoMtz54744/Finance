import TarjetaList from '@/pages/tarjetas/TarjetaList'
import { createFileRoute } from '@tanstack/react-router'
import ErrorPage from '@/pages/layouts/ErrorPage';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import LoadingPage from '@/pages/layouts/LoadingPage';
import { getTarjetasConUltimoPeriodo } from '@/services/tarjetaService';

export const Route = createFileRoute('/_auth/tarjetas/')({
  component: RouteComponent,
  errorComponent: ErrorPage
})

function RouteComponent() {
  const usuario = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useQuery({
    queryKey: ['tarjetas'],
    queryFn: ()=> getTarjetasConUltimoPeriodo(usuario!.id),
    enabled: !!usuario
  });

  if (!usuario) return <ErrorPage error={new Error("Usuario no autenticado")} />;
  
  if (isLoading) return <LoadingPage/>;

  if (error) return <ErrorPage error={error} />;
  
  return <TarjetaList tarjetas={data ?? []}/>
}
