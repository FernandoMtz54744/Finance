import LoadingPage from '@/pages/layouts/LoadingPage'
import TarjetaForm from '@/pages/tarjetas/TarjetaForm'
import { insertTarjeta } from '@/services/tarjetaService'
import type { TarjetaFormType } from '@/types/tarjeta'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/_auth/tarjetas/add')({
  component: RouteComponent,
})

function RouteComponent(){

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: insertTarjeta,
    onSuccess: () => {
      toast.success("Se agregó la tarjeta con éxito");
      queryClient.invalidateQueries({ queryKey: ['tarjetas'] });
      router.navigate({ to: "/tarjetas" });
    },
    onError: (e) => {
      toast.error("No se agregó la tarjeta");
      console.log(e.message);
    },
  });

  if(mutation.isPending){
    return <LoadingPage/>
  }

  return <TarjetaForm onSubmit={(tarjeta: TarjetaFormType) => mutation.mutate(tarjeta)}/>
}
