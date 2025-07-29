import { supabase } from '@/lib/supabaseClient'
import TarjetaForm from '@/pages/tarjetas/TarjetaForm'
import type { TarjetaFormType } from '@/types/tarjeta'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/tarjetas/add')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addTarjeta = async (tarjeta: TarjetaFormType)=>{
    try{
      setLoading(true);
      const { error } = await supabase.from('tarjetas').insert([tarjeta]);
      if(error){
        throw error
      }
      toast.success("Se agregó la tarjeta con éxito");
      router.navigate({to: "/tarjetas"});
    }catch(error){
      console.log(error);
      toast.error("No se agregó la tarjeta")
    }finally{
      setLoading(false);
    }
    
  }

  if(loading){
    return <div>Loading...</div>
  }
  return <TarjetaForm onSubmit={addTarjeta}/>
}
