import { DatePicker } from "@/components/form/DatePicker";
import FormError from "@/components/form/FormError";
import { dateToString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import LoadingPage from "../layouts/LoadingPage";
import ErrorPage from "../layouts/ErrorPage";
import type { User } from "@supabase/supabase-js";
import { getMovimientosEstadistica } from "@/services/estadisticasService";
import type { MovimientosEstadisticasFormType } from "@/types/movimientoEstadistica";
import { fechaInicioFinSchema } from "@/validations/fechaInicioFinSchema";
import PieCategoriasChart from "./graficas/PieCategoriasChart";

type Props = {
    usuario: User,
    mostrarTransferencias: boolean
}

export default function EstadisticaMensual({usuario, mostrarTransferencias}: Props) {
    const { control, formState:{errors}, setValue } = useForm<MovimientosEstadisticasFormType>({
        resolver: zodResolver(fechaInicioFinSchema),
        defaultValues: {
        fechaInicio: DateTime.now().startOf("month").toJSDate(),
        fechaFin: DateTime.now().endOf("month").toJSDate(),
        }
    });

    
    const fechaInicio = useWatch({ control, name: "fechaInicio" });
    const fechaFin = useWatch({ control, name: "fechaFin" });


    const { data: movimientos, isLoading, isFetching ,error } = useQuery({
        queryKey: ['balance', dateToString(fechaInicio), dateToString(fechaFin)],
        queryFn: ()=> getMovimientosEstadistica(
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

        <div className="grid grid-cols-2 gap-4 mt-4 mx-6">
            <div className="flex flex-col justify-center items-center">
                <span className="text-lg">Abonos</span>
                <PieCategoriasChart data={movimientosFilter.filter(mov => mov.tipo === "a")
                    .map(mov => ({idCategoria: mov.categoria.idCategoria, categoria: mov.categoria.descripcion, cantidad: mov.cantidad}))}/>
            </div>

            <div className="flex flex-col justify-center items-center">
                <span className="text-lg">Cargos</span>
                <PieCategoriasChart data={movimientosFilter.filter(mov => mov.tipo === "c")
                    .map(mov => ({idCategoria: mov.categoria.idCategoria, categoria: mov.categoria.descripcion, cantidad: mov.cantidad}))}/>
            </div>
            <div className="bg-gray-200 p-4">3</div>
            </div>
    </div>
  )
}
