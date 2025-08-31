import { supabase } from '@/lib/supabaseClient';
import LoginForm from '@/pages/auth/LoginForm';
import type { LoginFormType } from '@/types/auth';
import { AuthError } from '@supabase/supabase-js';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {

  const [error, setError] = useState<AuthError>();

  const login = async (authData: LoginFormType)=>{
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authData.correo,
      password: authData.password 
    });

    if(error){
      setError(error);      
    }else{
      console.log(data);
    }
  }

  return <LoginForm onSubmit={login} error={error}/>
}
