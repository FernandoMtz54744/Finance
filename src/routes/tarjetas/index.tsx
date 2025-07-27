import TarjetaList from '@/pages/tarjetas/TarjetaList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tarjetas/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <TarjetaList/>
  </div>
}
