import PeriodoForm from '@/pages/periodos/PeriodoForm';
import { updatePeriodo } from '@/services/periodoService';
import { useTarjetaStore } from '@/stores/tarjetaStore';
import type { Periodo, PeriodoFormType } from '@/types/periodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router'
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_auth/periodos/edit')({
  component: RouteComponent,
})

function RouteComponent() {
    const { periodo }: { periodo: Periodo}  = useSearch({ from: '/_auth/periodos/edit' });
    const tarjeta = useTarjetaStore((state) => state.tarjeta);
    const router = useRouter();
    const queryClient = useQueryClient();

    if(!tarjeta){
        router.navigate({to: "/tarjetas"});
        return;
    }

    const mutation = useMutation({
    mutationFn: updatePeriodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['periodos'] });
      router.navigate({ to: `/periodos/${tarjeta.id}` });
      toast.success("Se editó el periodo con éxito");
    },
    onError: (e) => {
      toast.error("No se editó el periodo");
      console.log(e.message);
    }
  });


  return <PeriodoForm periodo={periodo} tarjeta={tarjeta} 
    onSubmit={(periodoForm: PeriodoFormType) => mutation.mutate({periodo: periodoForm, id: periodo.id})}/>
}
