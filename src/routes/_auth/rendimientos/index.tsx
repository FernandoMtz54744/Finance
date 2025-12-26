import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import RendimientosList from '@/pages/rendimientos/RendimientosList';
import { getRendimientos } from '@/services/movimientoService';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/rendimientos/')({
  component: RouteComponent
})


function RouteComponent() {

    const usuario = useAuthStore((state) => state.user);
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['rendimientos'],
        queryFn: ()=> getRendimientos(usuario!.id)
    });

    if (!usuario) return <ErrorPage error={new Error("Usuario no autenticado")} />;
      
    if (isLoading) return <LoadingPage/>;

    if (error) return <ErrorPage error={error} />;

    return <RendimientosList rendimientosPorMes = {data ?? {}}/>
}
