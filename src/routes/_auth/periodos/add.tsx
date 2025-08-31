import PeriodoForm from '@/pages/periodos/PeriodoForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/periodos/add')({
  component: RouteComponent,
})

function RouteComponent() {

  const addPeriodo = ()=>{

  }

  return <PeriodoForm onSubmit={addPeriodo}/>
}
