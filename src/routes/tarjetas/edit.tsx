import TarjetaForm from '@/pages/tarjetas/TarjetaForm';
import { createFileRoute, useSearch } from '@tanstack/react-router'

export const Route = createFileRoute('/tarjetas/edit')({
  component: RouteComponent,
})



function RouteComponent() {
  const { tarjeta }  = useSearch({ from: '/tarjetas/edit' });


  return <TarjetaForm tarjeta={tarjeta} onSubmit={()=>{}}/>
}
