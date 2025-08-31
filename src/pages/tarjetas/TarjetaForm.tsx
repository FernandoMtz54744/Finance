import { ColorPicker } from "@/components/form/ColorPicker";
import { Form } from "@/components/form/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tarjeta, TarjetaFormType } from "@/types/tarjeta";
import type { JSX } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { tarjetaSchema } from "@/validations/tarjetaSchema";
import { CreditCard } from "lucide-react";
import FormError from "@/components/form/FormError";
import { useNavigate } from "@tanstack/react-router";


type Props = {
    tarjeta?: Tarjeta,
    onSubmit: SubmitHandler<TarjetaFormType>
}

export default function TarjetaForm({tarjeta, onSubmit}: Props): JSX.Element {
    
    const navigate = useNavigate()
    const { register, handleSubmit, setValue, watch, control, formState:{errors} } = useForm<TarjetaFormType>({
        resolver: zodResolver(tarjetaSchema),
        defaultValues: {
            nombre: tarjeta?.nombre ?? "",
            color: tarjeta?.color ?? "#FFFFFF",
            correo: tarjeta?.correo ?? "",
            diaCorte: tarjeta?.diaCorte ?? 1,
            tipo: tarjeta?.tipo ?? 'd'
        }
    });

    const back = ()=>{
        navigate({to: "/tarjetas"})
    }

    return (
        <Form title='Tarjeta' description="Agrega los datos de tu tarjeta" icon={CreditCard} onSubmit={handleSubmit(onSubmit)}>
            
            <div className="grid grid-cols-12 gap-x-6">
                <Label className="col-span-full">Nombre</Label>
                <Input type="text" className="col-span-10 md:col-span-11" {...register("nombre")} />
                <ColorPicker onChange={(color: string)=>{setValue("color", color, {shouldValidate: true})}} value={watch("color")}/>
                <FormError error={errors.nombre}></FormError>
                <FormError error={errors.color} className="mt-0"></FormError>
            </div>

            <div>
                <Label>Tipo</Label>
                <Controller name="tipo" control={control} defaultValue="c" render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tipo de tarjeta</SelectLabel>
                                <SelectItem value="c">Crédito</SelectItem>
                                <SelectItem value="d">Débito</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}/>
            </div>

            <div>
                <Label>Día de corte</Label>
                <Input type="number" {...register("diaCorte", {setValueAs: value => Number(value)})}/>
                <FormError error={errors.diaCorte} />
            </div>

            <div>
                <Label>Correo</Label>
                <Input id="correo" type="email" {...register("correo")}/>
                <FormError error={errors.correo}/>
            </div>

            <div className="flex flex-col gap-y-4 mt-8">
                <Button type="submit" className="w-full">Agregar</Button>
                <Button onClick={()=>back()} variant="outline" className="w-full">Cancelar</Button>
            </div>
        </Form>
    )
}
