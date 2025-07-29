import Sidebar from '@/components/sidebar/Sidebar'
import { supabase } from '@/lib/supabaseClient';
import { createRootRoute, Outlet, redirect, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'react-hot-toast';  

const publicRoutes = ['/', '/login', '/register'];

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const isPublicRoute = publicRoutes.includes(location.pathname);
    const { data: { session } } = await supabase.auth.getSession();
    console.log(session);
    
    if (!session && !isPublicRoute) {
      throw redirect({ to: '/' })
    }
  },
  component: () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const isPublicRoute = publicRoutes.includes(pathname);

    if(isPublicRoute)
      return <Outlet />
    else 
      return (
        <>
          <Sidebar>
            <Outlet />
          </Sidebar>
          <Toaster/>
          {/* <TanStackRouterDevtools/> */}
        </>
      )
  }
})