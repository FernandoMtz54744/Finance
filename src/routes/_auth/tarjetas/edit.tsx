import TarjetaForm from '@/pages/tarjetas/TarjetaForm';
import { createFileRoute, useSearch } from '@tanstack/react-router'


export const Route = createFileRoute('/_auth/tarjetas/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { tarjeta }  = useSearch({ from: '/_auth/tarjetas/edit' });

  return <TarjetaForm tarjeta={tarjeta} onSubmit={()=>{}}/>
}
