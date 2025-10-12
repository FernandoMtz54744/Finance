import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import PeriodoList from '@/pages/periodos/PeriodoList';
import { getPeriodos } from '@/services/periodoService';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/periodos/$id')({
  component: RouteComponent
})

function RouteComponent() {

  const id = Route.useParams().id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['periodos'],
    queryFn: ()=> getPeriodos(id)
  });

  if (isLoading) return <LoadingPage/>;
  
  if (error) return <ErrorPage error={error} />;

  return ( <PeriodoList periodos = {data ?? []}/>)
}
