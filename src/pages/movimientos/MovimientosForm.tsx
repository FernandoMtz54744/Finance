import { DatePicker } from "@/components/form/DatePicker";
import FormError from "@/components/form/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFechaLimitePago, IsoToDate } from "@/lib/utils";
import { insertMovimiento } from "@/services/movimientoService";
import type { MovimientoFormType } from "@/types/movimiento";
import type { Periodo } from "@/types/periodo";
import type { Tarjeta } from "@/types/tarjeta";
import { movimientoSchema } from "@/validations/movimientoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  idPeriodo: string,
  periodo: Periodo,
  tarjeta: Tarjeta
}

export default function MovimientosForm({idPeriodo, periodo, tarjeta}: Props) {

  const queryClient = useQueryClient();
  

  const { register, handleSubmit, control, formState:{errors}, watch, setValue, reset } = useForm<MovimientoFormType>({
      resolver: zodResolver(movimientoSchema),
  });

  const mutation = useMutation({
    mutationFn: insertMovimiento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movimientos', idPeriodo] });
      reset();
    },
    onError: (e) => {
      toast.error("No se pudo agregar el movimiento");
      console.log(e.message);
    },
  });

  const onSubmit = (movimiento: MovimientoFormType)=>{    
    mutation.mutate({movimiento: movimiento, idPeriodo: idPeriodo})

  }

  const cantidad = watch("cantidad");
  const tipo = watch("tipo");

  useEffect(() => {
    if(!cantidad || cantidad >= 0){
      setValue("tipo", "a")
    }else{
      setValue("tipo", 'c')
    }
  }, [cantidad, setValue]);

  useEffect(() => {
    if(tipo === 'a' || tipo === 'r'){
      setValue("cantidad", Math.abs(cantidad));
    }else{
      setValue("cantidad", Math.abs(cantidad) * -1);
    }
  }, [tipo, setValue]);

  return (
    <div>
      <form className="grid grid-cols-12 md:gap-x-8 gap-y-4 my-4 mx-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-12 md:col-span-2">
          <Controller name="fecha" control={control} render={({ field }) => (
            <DatePicker {...field} placeholder="Fecha" minDate={IsoToDate(periodo.fechaInicio)} 
            maxDate={ tarjeta.tipo === "d" ? IsoToDate(periodo.fechaCorte) : getFechaLimitePago(IsoToDate(periodo.fechaCorte))}/>
          )}/>
          <FormError error={errors.fecha}></FormError>
        </div>

        <div className="col-span-12 md:col-span-2">
          <Input type="number" placeholder="Cantidad" step="0.01" {...register("cantidad", {setValueAs: value => Number(value)})}/>
          <FormError error={errors.cantidad}></FormError>
        </div>

        <div className="col-span-12 md:col-span-4">
          <Input type="text" placeholder="Motivo" {...register("motivo")} maxLength={50}/>
          <FormError error={errors.motivo}></FormError>
        </div>

        <div className="col-span-12 md:col-span-2">
          <Controller name="tipo" control={control} defaultValue="a" render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo de movimiento</SelectLabel>
                        <SelectItem value="a">Abono</SelectItem>
                        <SelectItem value="c">Cargo</SelectItem>
                        <SelectItem value="r">Rendimiento</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        )}/>
        </div>

        <Button type="submit" className="col-span-12 md:col-span-2 hover:cursor-pointer">Agregar</Button>
        
      </form>
    </div>
  )
}
