import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { Separator } from '@/components/ui/separator';
import LineTimeChart from '@/pages/estadisticas/graficas/LineTimeChart';
import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import SaldoActual from '@/pages/saldo/SaldoActual';
import SaldoList from '@/pages/saldo/SaldoList';
import { getLastEfectivo } from '@/services/efectivoService';
import { getSaldos, insertSaldo } from '@/services/saldosService';
import { getTarjetasConUltimoPeriodo } from '@/services/tarjetaService';
import { useAuthStore } from '@/stores/authStore';
import type { Efectivo } from '@/types/efectivo';
import type { Saldo } from '@/types/saldo';
import type { Tarjeta } from '@/types/tarjeta';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Camera } from 'lucide-react';
import { DateTime } from 'luxon';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/_auth/saldo/')({
  component: RouteComponent,
})

function RouteComponent() {

  const usuario = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: efectivo, isLoading: isLoadingEfectivo, error: errorEfectivo } = useQuery({
    queryKey: ['saldoEfectivo'],
    queryFn: ()=> getLastEfectivo(usuario!.id),
    enabled: !!usuario
  });

  const { data: tarjetas, isLoading: isLoadingTarjetas, error: errorTarjetas } = useQuery({
    queryKey: ['saldoTarjetas'],
    queryFn: ()=> getTarjetasConUltimoPeriodo(usuario!.id),
    enabled: !!usuario
  });

  const { data: saldos, isLoading: isLoadingSaldos, error: errorSaldos } = useQuery<Saldo[]>({
    queryKey: ['saldos'],
    queryFn: ()=> getSaldos(usuario!.id),
    enabled: !!usuario,
    initialData: []
  });

  const mutation = useMutation({
    mutationFn: insertSaldo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saldos'] });
    },
    onError: (e) => {
      toast.error("No se pudo agregar el movimiento");
      console.log(e.message);
    },
  });

  if(isLoadingEfectivo || isLoadingTarjetas || isLoadingSaldos) return <LoadingPage/>;

  const error = errorEfectivo || errorTarjetas || errorSaldos;
  if(error) return <ErrorPage error={error}/>

  function calcularEfectivo(denominaciones: Record<string, number>) {
    return Object.entries(denominaciones).reduce((sum, [valor, cantidad]) => sum + Number(valor) * cantidad, 0);
  }

  function transformHistorial(saldos: any[]) {
    return saldos.map((saldo) => {
      const totalTarjetas = saldo.tarjetas.reduce((sum: number, t: any) => sum + t.saldoFinal,0);
      const efectivo = calcularEfectivo(saldo.efectivo);

      return {
        fecha: DateTime.fromISO(saldo.fecha).toISODate() ?? "",
        efectivo,
        tarjetas: totalTarjetas,
        total: efectivo + totalTarjetas,
      };
    });
  }

  function transformActual(tarjetas: any[], efectivo: any) {
    const totalTarjetas = tarjetas.reduce(
      (sum, t) => sum + (t.ultimoPeriodo?.saldoFinal || 0),
      0
    );

    const efectivoTotal = calcularEfectivo(efectivo.denominaciones);

    return {
      fecha: DateTime.now().toISODate(),
      efectivo: efectivoTotal,
      tarjetas: totalTarjetas,
      total: efectivoTotal + totalTarjetas,
    };
  }


  function buildChartData(saldos: Saldo[], tarjetas: Tarjeta[], efectivo: Efectivo) {
  const historial = transformHistorial(saldos);
  const actual = transformActual(tarjetas, efectivo);

  const merged = [...historial, actual];

  const map = new Map<string, any>();

  merged.forEach((item) => {
    const mes = item.fecha.slice(0, 7); // YYYY-MM
    map.set(mes, item); // el último (actual) sobrescribe
  });

  return Array.from(map.values()).sort(
    (a, b) =>
      DateTime.fromISO(a.fecha).toMillis() -
      DateTime.fromISO(b.fecha).toMillis()
  );
}

  const chartData = buildChartData(saldos, tarjetas, efectivo);

  return <>
    <SaldoActual tarjetas={tarjetas ?? []} efectivo={efectivo ?? {}}/>
    <Separator className='my-8'/>
    <SaldoList saldos={saldos ?? []}/>
    <ConfirmDialog title='Guardar saldo actual' confirmText='Aceptar' cancelText='Cancelar' confirmAction={()=> mutation.mutate({tarjetas,efectivo})}
      description='¿Deseas guardar el estado actual del saldo?'>
      <Camera className="fixed right-6 bottom-6 hover:cursor-pointer size-8"/>
    </ConfirmDialog>
    <LineTimeChart
      data={chartData}
      series={[
        { key: "tarjetas", color: "#3B82F6", name: "Tarjetas" },
        { key: "total", color: "#22C55E", name: "Total" },
      ]}
/>
  </>
}
