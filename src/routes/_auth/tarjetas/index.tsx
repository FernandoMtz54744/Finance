import TarjetaList from '@/pages/tarjetas/TarjetaList'
import { createFileRoute } from '@tanstack/react-router'
import ErrorPage from '@/pages/layouts/ErrorPage';
import { getTarjetas } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import LoadingPage from '@/pages/layouts/LoadingPage';

export const Route = createFileRoute('/_auth/tarjetas/')({
  component: RouteComponent,
  errorComponent: ErrorPage
})

function RouteComponent() {
  const usuario = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useQuery({
    queryKey: ['tarjetas'],
    queryFn: ()=> getTarjetas(usuario!.id),
    enabled: !!usuario
  });

  if (!usuario) return <p>No hay usuario autenticado</p>;
  if (isLoading) return <p>Cargando tarjetas...</p>;
  if (error) return <ErrorPage error={error} />;
  
  return <TarjetaList tarjetas={data ?? []}/>
  // return <LoadingPage/>
}
