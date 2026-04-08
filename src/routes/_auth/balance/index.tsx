import { DatePicker } from '@/components/form/DatePicker';
import FormError from '@/components/form/FormError';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { dateToString, formatMXN } from '@/lib/utils';
import MovimientosBalanceList from '@/pages/balance/MovimientoBalanceList';
import ErrorPage from '@/pages/layouts/ErrorPage';
import LoadingPage from '@/pages/layouts/LoadingPage';
import { getMovimientosBalance } from '@/services/balanceService';
import { useAuthStore } from '@/stores/authStore';
import type {  MovimientosBalanceFormType } from '@/types/movimientoBalance';
import { movimientoBalanceSchema } from '@/validations/movimientosBalanceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

export const Route = createFileRoute('/_auth/balance/')({
  component: RouteComponent,
})

function RouteComponent() {

  const usuario = useAuthStore((state) => state.user);
  const { control, formState:{errors}, setValue } = useForm<MovimientosBalanceFormType>({
    resolver: zodResolver(movimientoBalanceSchema),
    defaultValues: {
    fechaInicio: DateTime.now().startOf("month").toJSDate(),
    fechaFin: DateTime.now().endOf("month").toJSDate(),
    }
  });

  const fechaInicio = useWatch({ control, name: "fechaInicio" });
  const fechaFin = useWatch({ control, name: "fechaFin" });

  const [mostrarTransferencias, setMostrarTransferencias] = useState(false);

  const { data: movimientos, isLoading, isFetching ,error } = useQuery({
      queryKey: ['balance', dateToString(fechaInicio), dateToString(fechaFin)],
      queryFn: ()=> getMovimientosBalance(
      usuario!.id, 
      DateTime.fromJSDate(fechaInicio).toISODate()!, 
      DateTime.fromJSDate(fechaFin).toISODate()!
    ),
    enabled: !!usuario && fechaInicio instanceof Date && fechaFin instanceof Date,
    initialData: []
  });

  useEffect(() => {
    if(fechaInicio instanceof Date){
      const date = DateTime.fromJSDate(fechaInicio);
      setValue("fechaFin", date.plus({ months: 1 }).minus({ days: 1 }).toJSDate())
    }
  }, [fechaInicio, setValue]);

  if (isLoading || isFetching) return <LoadingPage/>; 
    
  if (error) return <ErrorPage error={error} />;

  const movimientosFilter = movimientos?.filter(movimiento => mostrarTransferencias || movimiento.tipo !== 't'); 

  const balanceTotal = movimientosFilter.reduce((total, current)=>{
      return total + current.cantidad;
    }, 0);

  return (
  <div>
    {/* Fechas */}
    <div className='grid grid-cols-12 gap-6 mx-6'>
      <div className="col-span-6 md:col-span-6">
        <Controller name="fechaInicio" control={control} render={({ field }) => (
          <DatePicker {...field}/>
        )}/>
        <FormError error={errors.fechaInicio}></FormError>
      </div>
      <div className="col-span-6 md:col-span-6">
        <Controller name="fechaFin" control={control} render={({ field }) => (
          <DatePicker {...field}/>
        )}/>
        <FormError error={errors.fechaFin}></FormError>
      </div>
    </div>

    {/* Balance Total */}
    <div className='bg-emerald-900 py-2 text-center mx-6 my-6 rounded-md flex flex-row justify-center gap-2'>
      {formatMXN(balanceTotal)}
      {balanceTotal > 0 ? 
        <ArrowBigUp className='text-emerald-500'/>
        :<ArrowBigDown className='text-red-500'/>
      }
    </div>

    <div className="flex flex-col md:flex-row items-center md:justify-end gap-2 mx-8 mt-4">
      <Label htmlFor="count-transferencia" className='hover:cursor-pointer'>Mostrar transferencias</Label>
      <Switch id="count-transferencia" checked={mostrarTransferencias} onCheckedChange={setMostrarTransferencias} className='hover:cursor-pointer'/>
    </div>

    {/* Tabla */}
    <MovimientosBalanceList movimientos={movimientosFilter}></MovimientosBalanceList>
  </div>
  )
}
