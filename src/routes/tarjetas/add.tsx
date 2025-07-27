import TarjetaForm from '@/pages/tarjetas/TarjetaForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tarjetas/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TarjetaForm/>
}
