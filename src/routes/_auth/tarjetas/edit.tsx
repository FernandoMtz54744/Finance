import LoadingPage from '@/pages/layouts/LoadingPage';
import TarjetaForm from '@/pages/tarjetas/TarjetaForm';
import { updateTarjeta } from '@/services/tarjetaService';
import type { Tarjeta, TarjetaFormType } from '@/types/tarjeta';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router'
import toast from 'react-hot-toast';


export const Route = createFileRoute('/_auth/tarjetas/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { tarjeta }: { tarjeta: Tarjeta}  = useSearch({ from: '/_auth/tarjetas/edit' });
  const router = useRouter();
  const queryClient = useQueryClient();

  if(!tarjeta){
    router.navigate({to: "/tarjetas"})
  }

  const mutation = useMutation({
    mutationFn: updateTarjeta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarjetas'] });
      router.navigate({ to: "/tarjetas" });
      toast.success("Se editó la tarjeta con éxito");
    },
    onError: (e) => {
      toast.error("No se editó la tarjeta");
      console.log(e.message);
    }
  });

  if(mutation.isPending){
    return <LoadingPage/>
  }

  return <TarjetaForm 
    tarjeta={tarjeta} 
    onSubmit={(tarjetaForm: TarjetaFormType) => mutation.mutate({tarjeta: tarjetaForm, id: tarjeta.id})}/>
}
