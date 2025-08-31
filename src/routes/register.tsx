import { supabase } from '@/lib/supabaseClient';
import EmailConfirmation from '@/pages/auth/EmailConfirmation';
import RegisterForm from '@/pages/auth/RegisterForm';
import type { RegisterFormType } from '@/types/auth';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {

    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = useState(false); 
    const [email, setEmail] = useState("");

    const register = async (authData: RegisterFormType)=>{
        await supabase.auth.signUp({
            email: authData.correo,
            password: authData.password,
            options: {
                data: { name: authData.nombre }
            }
        });
        setEmail(authData.correo);
        setIsAwaitingConfirmation(true);
    }

    if(isAwaitingConfirmation){
        return <EmailConfirmation email={email}/>
    }

    return <RegisterForm onSubmit={register} />
}
