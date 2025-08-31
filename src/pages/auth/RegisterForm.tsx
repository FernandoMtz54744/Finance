import { Form } from "@/components/form/Form";
import FormError from "@/components/form/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegisterFormType } from "@/types/auth";
import { registerSchema } from "@/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthError } from "@supabase/supabase-js";
import { useNavigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  onSubmit: SubmitHandler<RegisterFormType>,
  error?: AuthError
}

export default function RegisterForm({onSubmit, error}: Props) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState:{errors} } = useForm<RegisterFormType>({
          resolver: zodResolver(registerSchema),
          values: { nombre: "", correo: "", password: "", passwordRepeat: "" }
      });

  return (
    <div className="flex flex-row justify-center items-center pt-15">
      <Form title="Registro" icon={LogIn} onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <Label>Nombre</Label>
          <Input type="text" {...register("nombre")}/>
          <FormError error={errors.nombre} />
        </div>

        <div>
          <Label>Correo</Label>
          <Input type="email" {...register("correo")}/>
          <FormError error={errors.correo} />
        </div>

        <div>
          <Label>Contraseña</Label>
          <Input type="password" {...register("password")}/>
          <FormError error={errors.password} />
        </div>

        <div>
          <Label>Repite contraseña</Label>
          <Input type="password" {...register("passwordRepeat")}/>
          <FormError error={errors.passwordRepeat} />
        </div>

        <div>
          {error && <p className="text-red-500 px-2 text-center">{error.message}</p>}
        </div>

        <div className="flex flex-col gap-y-4 mt-8">
            <Button type="submit" className="hover:cursor-pointer">Registrarme</Button>
            <Button type="button" onClick={()=> navigate({to: "/"})} variant="destructive" className="hover:cursor-pointer">Regresar</Button>
            
            <p className="text-right">
                ¿Ya tienes una cuenta?&nbsp;
                <span onClick={()=>navigate({to:"/login"})} className="text-emerald-400 hover:cursor-pointer">Inicia sesión</span>
            </p>
        </div>
      </Form>
    </div>
  )
}
