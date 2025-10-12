import { DatePicker } from "@/components/form/DatePicker"
import { Form } from "@/components/form/Form"
import FormError from "@/components/form/FormError"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Periodo, PeriodoFormType } from "@/types/periodo"
import { periodoSchema } from "@/validations/periodoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { FileChartColumn } from "lucide-react"
import { useEffect } from "react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { DateTime } from "luxon"
import type { Tarjeta } from "@/types/tarjeta"


type Props = {
    periodo?: Periodo,
    onSubmit: SubmitHandler<PeriodoFormType>,
    tarjeta: Tarjeta
}

export default function PeriodoForm({periodo, onSubmit, tarjeta }: Props) {

  const navigate = useNavigate()
  const { register, handleSubmit, control, formState:{errors}, watch, setValue } = useForm<PeriodoFormType>({
    resolver: zodResolver(periodoSchema),
    defaultValues: {
      nombre: periodo?.nombre ?? "",
      fechaInicio: periodo?.fechaInicio ?? new Date(),
      fechaCorte: periodo?.fechaCorte ?? new Date(),
      saldoInicial: periodo?.saldoInicial ?? 0 
    }
  });

  const back = ()=>{
    navigate({
      to: "/periodos/$id",
      params: { id: tarjeta.id }
    })
  };

  const fechaInicio = watch("fechaInicio");

  useEffect(() => {
    if(fechaInicio){
      const date = DateTime.fromJSDate(new Date(fechaInicio));
      setValue("fechaCorte", date.plus({ months: 1 }).minus({ days: 1 }).toJSDate())
    }
  }, [fechaInicio, setValue]);

  return (
    <Form title='Periodo' icon={FileChartColumn} onSubmit={handleSubmit(onSubmit)}
    description={`Periodo de ${tarjeta.nombre}`} >

      <div>
        <Label>Nombre</Label>
        <Input type="text" {...register("nombre")} />
        <FormError error={errors.nombre}></FormError>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <Label>Fecha Inicio</Label>
          <Controller name="fechaInicio" control={control} render={({ field }) => (
            <DatePicker {...field}/>
          )}/>
          <FormError error={errors.fechaInicio}></FormError>
        </div>

        <div className="col-span-12 md:col-span-6">
          <Label>Fecha Corte</Label>
          <Controller name="fechaCorte" control={control} render={({ field }) => (
            <DatePicker {...field}/>
          )}/>
          <FormError error={errors.fechaCorte}></FormError>
        </div>
      </div>

      <div>
        <Label>Saldo inicial</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
          <Input className="pl-6" step="0.01" type="number" {...register("saldoInicial", {setValueAs: value => Number(value)})}/>
        </div>
        <FormError error={errors.saldoInicial} />
      </div>

      <div className="flex flex-col gap-y-4 mt-8">
          <Button type="submit" className="w-full hover:cursor-pointer">Agregar</Button>
          <Button onClick={()=>back()} variant="outline" className="w-full hover:cursor-pointer">Cancelar</Button>
      </div>
    </Form>
  )
}
