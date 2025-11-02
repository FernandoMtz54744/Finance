import Sidebar from '@/components/sidebar/Sidebar';
import { supabase } from '@/lib/supabaseClient';
import { useAuthStore } from '@/stores/authStore';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: async ()=>{
    const {user, setUser} = useAuthStore.getState();
    if(!user){ //No hay usuario en contexto
      const { data: { session } } = await supabase.auth.getSession();
      if(session){
        setUser(session.user);
      }else{
        throw redirect({ to: '/' })
      }
    }else{
      console.log("Autenticado desde contexto");
    }
  }
})

function RouteComponent() {
  return (<>
    <Sidebar>
      <Outlet />
    </Sidebar>
    <Toaster/>
    {/* <TanStackRouterDevtools/> */}
  </>)
}
