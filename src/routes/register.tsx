import { supabase } from '@/lib/supabaseClient';
import AuthForm from '@/pages/auth/AuthForm'
import type { AuthFormType } from '@/types/auth';
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {

    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false); 
    const [email, setEmail] = useState("");

    const register = async (authData: AuthFormType)=>{
        await supabase.auth.signUp({
            email: authData.correo,
            password: authData.password,
        });
        setEmail(authData.correo);
        setIsAwaitingConfirmation(true);
    }

    if(isAwaitingConfirmation){
        return <div className='flex flex-col items-center justify-center mt-5 p-5'>
            <div className='text-center w-full md:w-1/2'>
                <p className='bg-emerald-900 text-4xl rounded-xs mb-5 py-1'>Finance</p>
                <div className='px-1 text-left'>
                    <p>
                        ¡Bienvenido, <span className='text-emerald-500'>{email}</span>! 🎉
                    </p>
                    <br />
                    <p>
                        Te hemos enviado un enlace de verificación a tu correo. <br />
                        Por favor, revisa tu bandeja de entrada (y la carpeta de spam) para confirmar que este correo electrónico es tuyo.
                    </p>
                </div>
                <div className='mt-10'>
                    <Link to='/' className='text-emerald-500'>Regresar al inicio</Link>
                </div>

            </div>
        </div>
    }

    return <AuthForm onSubmit={register} isLogin={false}/>
}
