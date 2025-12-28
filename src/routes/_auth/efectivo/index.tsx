import { Separator } from '@/components/ui/separator';
import EfectivoForm from '@/pages/efectivo/EfectivoForm'
import EfectivoList from '@/pages/efectivo/EfectivoList'
import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import { getEfectivo } from '@/services/efectivoService';
import { useAuthStore } from '@/stores/authStore';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/efectivo/')({
  component: RouteComponent,
})

function RouteComponent() {
  const usuario = useAuthStore((state) => state.user);
  const { data, isLoading, error } = useQuery({
    queryKey: ['efectivo'],
    queryFn: ()=> getEfectivo(usuario!.id),
    enabled: !!usuario
  });

  if(!usuario) return <ErrorPage error={new Error("Usuario no autenticado")} />;
    
  if(isLoading) return <LoadingPage/>;
  
  if(error) return <ErrorPage error={error} />;
    

  return <>
    <EfectivoForm/>
    <Separator className='my-8'/>
    <EfectivoList data = {data ?? []}/>
  </>
  
}
