import FormError from "@/components/form/FormError"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { insertEfectivo } from "@/services/efectivoService"
import { DENOMINACIONES } from "@/types/efectivo"
import type { EfectivoFormType } from "@/types/efectivo"
import { efectivoSchema } from "@/validations/efectivoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export default function EfectivoForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<EfectivoFormType>({
        resolver: zodResolver(efectivoSchema),
        defaultValues: { 
            denominaciones: Object.fromEntries(
                DENOMINACIONES.map(d => [String(d), 0])
            )
        }
    });

    const mutation = useMutation({
      mutationFn: insertEfectivo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["efectivo"] });
        toast.success("Efectivo agregado");
        reset();
      },
      onError: () => {
        toast.error("Ocurrió un error al agregar el efectivo");
      },
    });

    const denominaciones = watch("denominaciones")
    const total = Object.entries(denominaciones ?? {}).reduce((sum, [den, cantidad]) => sum + Number(den) * cantidad, 0)

    const onSubmit = async (data: EfectivoFormType) => {
      if(total <= 0){
        toast.error("Debe ingresar una cantidad");
        return;
      }
      mutation.mutate(data);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-8 flex flex-row justify-center mb-8">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th>Billete</th>
            <th>Cantidad</th>
            <th className="text-right">Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {DENOMINACIONES.map((den) => {
            const cantidad = denominaciones?.[den] ?? 0
            return (
              <tr key={den}>
                <td>${den}</td>
                <td>
                    <Input type="number" min={0} {...register(`denominaciones.${den}` as const, {setValueAs: (v) => (v === "" ? 0 : Number(v)) })}/>
                    <FormError error={errors.denominaciones?.[den]}></FormError>
                </td>
                <td className="text-right">${den * cantidad}</td>
              </tr>
            )
          })}

        <tr className="font-semibold border-t">
            <td colSpan={2}>Total</td>
            <td className="text-right">
              ${total.toLocaleString()}
            </td>
        </tr>

        <tr>
            <td colSpan={3} className="pt-4">
                <Button type="submit" className="w-full">Aceptar</Button>
            </td>
        </tr>
        </tbody>
    </table>
    </form>
  )
}
