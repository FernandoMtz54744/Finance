import PeriodoList from '@/pages/periodos/PeriodoList';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/periodos/$id')({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    console.log(params.id);
    
  }
})

function RouteComponent() {

  // const { id } = Route.useParams()
  // const periodos = [{nombre:"Periodo1", fechaInicio: new Date(), fechaFin: new Date()}]


  return (
    <PeriodoList/>
  )
}
