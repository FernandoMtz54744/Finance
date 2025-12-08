import { Form } from "@/components/form/Form";
import FormError from "@/components/form/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginFormType } from "@/types/auth";
import { loginSchema } from "@/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthError } from "@supabase/supabase-js";
import { useNavigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = {
  onSubmit: SubmitHandler<LoginFormType>,
  loginGoogle: (event: any)=>void,
  error?: AuthError
}

export default function LoginForm({onSubmit, error, loginGoogle}: Props) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState:{errors} } = useForm<LoginFormType>({
          resolver: zodResolver(loginSchema),
          values: { correo: "", password: "" }
      });

  return (
    <div className="flex flex-row justify-center items-center pt-15">
      <Form title="Login" icon={LogIn} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Correo</Label>
          <Input type="email" {...register("correo")}/>
          <FormError error={errors.correo} />
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")}/>
          <FormError error={errors.password} />
        </div>

        <div>
          {error && <p className="text-red-500 px-2 text-center">{error.message}</p>}
        </div>

        <div className="flex flex-col gap-y-4 mt-8">
            <Button type="submit" className="hover:cursor-pointer">Login</Button>
            <Button type="submit" onClick={(e)=>loginGoogle(e)} 
              className="bg-blue-600 hover:bg-blue-700 text-gray-200 hover:cursor-pointer">Sign In With Google</Button>
            <Button type="button" onClick={()=> navigate({to: "/"})} variant="destructive" className="hover:cursor-pointer">Regresar</Button>
            <p className="text-right">
              ¿No tienes una cuenta?&nbsp;
              <span onClick={()=>navigate({to:"/register"})} className="text-emerald-400 hover:cursor-pointer">Regístrate</span>
            </p>
        </div>
      </Form>
    </div>
  )
}
