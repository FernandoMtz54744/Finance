import { DatePicker } from "@/components/form/DatePicker";
import FormError from "@/components/form/FormError";
import { CustomIcon } from "@/components/icon/CustomIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFechaLimitePago, IsoToDate } from "@/lib/utils";
import { getCategorias } from "@/services/categoriaService";
import { insertMovimiento, updateMovimiento } from "@/services/movimientoService";
import type { Movimiento, MovimientoFormType } from "@/types/movimiento";
import type { Periodo } from "@/types/periodo";
import type { Tarjeta } from "@/types/tarjeta";
import { movimientoSchema } from "@/validations/movimientoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  idPeriodo: string,
  periodo: Periodo,
  tarjeta: Tarjeta,
  modo: "crear" | "editar",
  initialData?: Movimiento,
  setOpen?: (open: boolean)=> void
}

export default function MovimientosForm({idPeriodo, periodo, tarjeta, modo, initialData, setOpen}: Props) {

  const queryClient = useQueryClient();
  
  const { register, handleSubmit, control, formState:{errors}, watch, setValue, reset } = useForm<MovimientoFormType>({
      resolver: zodResolver(movimientoSchema),
      defaultValues: {
        fecha: initialData?.fecha? IsoToDate(initialData.fecha) : undefined,
        cantidad: initialData?.cantidad,
        motivo: initialData?.motivo,
        tipo: initialData?.tipo,
        idCategoria: initialData?.categoria.idCategoria
      }
  });

  const mutationInsert = useMutation({
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

  const mutationUpdate = useMutation({
    mutationFn: updateMovimiento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movimientos', idPeriodo] });
      reset();
      toast.success("Movimiento editado con éxito");
    },
    onError: (e) => {
      toast.error("No se pudo agregar el movimiento");
      console.log(e.message);
    }
  });

  const onSubmit = (movimiento: MovimientoFormType)=>{    
    if( modo === "editar" && initialData){
      setOpen && setOpen(false);
      mutationUpdate.mutate({movimiento: movimiento, idMovimiento: initialData.id})
    }else{
      mutationInsert.mutate({movimiento: movimiento, idPeriodo: idPeriodo})
    }
  }

  const cantidad = watch("cantidad");
  const tipo = watch("tipo");

  useEffect(() => {
    if(tipo === 'a' || tipo === 'r'){
      setValue("cantidad", Math.abs(cantidad));
    }else if(tipo === 'c'){
      setValue("cantidad", Math.abs(cantidad) * -1);
    }
  }, [tipo, setValue]);

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: getCategorias,
  });


  return (
    <div>
      <form className="grid grid-cols-12 md:gap-x-8 gap-y-4 my-4 mx-8" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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

        <div className="col-span-12 md:col-span-3">
          <Input type="text" placeholder="Motivo" {...register("motivo")} maxLength={50}/>
          <FormError error={errors.motivo}></FormError>
        </div>

        <div className="col-span-12 md:col-span-2">
          <Controller name="tipo" control={control} render={({ field }) => (
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
                        <SelectItem value="t">Transferencia (entre cuentas)</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
          )}/>
        </div>

        <div className="col-span-12 md:col-span-2">
          <Controller name="idCategoria" control={control} render={({ field }) => (
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value ? String(field.value) : ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorías</SelectLabel>
                      {categorias?.map((cat) => (
                        <SelectItem key={cat.idCategoria} value={cat.idCategoria.toString()}>
                          {cat.descripcion} <CustomIcon name={cat.icono} className="ml-2 text-white"/>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FormError error={errors.idCategoria}></FormError>
      </div>

      <Button type="submit" className="col-span-12 md:col-span-1 hover:cursor-pointer">{modo === "editar" ? "Editar" : "Agregar"}</Button>
      </form>
    </div>
  )
}
