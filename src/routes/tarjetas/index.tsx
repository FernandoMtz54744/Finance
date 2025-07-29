import TarjetaList from '@/pages/tarjetas/TarjetaList'
import { createFileRoute } from '@tanstack/react-router'
import Error from '@/pages/error/Error';
import { supabase } from '@/lib/supabaseClient';

export const Route = createFileRoute('/tarjetas/')({
  component: RouteComponent,
  loader: async ()=>{
    // const { data, error} = await supabase.from("tarjetas").select("*");
    // if(error) throw error;
    // return data;
    return [];
  },
  errorComponent: Error
})

function RouteComponent() {
  const tarjetas = Route.useLoaderData();
  
  return <TarjetaList tarjetas={tarjetas}/>
}
