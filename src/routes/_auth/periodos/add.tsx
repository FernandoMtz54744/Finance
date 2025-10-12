import PeriodoForm from '@/pages/periodos/PeriodoForm'
import { insertPeriodo } from '@/services/periodoService';
import { useTarjetaStore } from '@/stores/tarjetaStore';
import type { PeriodoFormType } from '@/types/periodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router'
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_auth/periodos/add')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter();
  const queryClient = useQueryClient();
  const tarjeta = useTarjetaStore((state)=> state.tarjeta);

  if(!tarjeta){
    router.navigate({to: "/tarjetas"});
    return;
  }

  const mutation = useMutation({
    mutationFn: insertPeriodo,
    onSuccess: () => {
      toast.success("Se agregó el periodo con éxito");
      queryClient.invalidateQueries({ queryKey: ['tarjetas'] });
      router.navigate({ to: "/periodos/$id", params: { id: tarjeta.id } });
    },
    onError: (e) => {
      toast.error("No se agregó la tarjeta");
      console.log(e.message);
    },
  });

  return <PeriodoForm 
    tarjeta={tarjeta}
    onSubmit={(periodo: PeriodoFormType) => mutation.mutate({periodo: periodo, idTarjeta: tarjeta.id }) }/>
}
