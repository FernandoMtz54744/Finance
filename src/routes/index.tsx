import { supabase } from '@/lib/supabaseClient';
import Landing from '@/pages/LandingPage'
import { useAuthStore } from '@/stores/authStore';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async ()=>{
    const {user, setUser} = useAuthStore.getState();
    if(user){
      throw redirect({to: "/tarjetas"});
    }else{
      const { data: { session } } = await supabase.auth.getSession();
      if(session){
        setUser(session.user);
        throw redirect({to: "/tarjetas"});
      }
    }
  },
  component: Landing,
})