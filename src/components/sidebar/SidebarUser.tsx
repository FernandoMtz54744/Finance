import { ChevronsUpDown, LogOut, User as UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/authStore"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "@tanstack/react-router"

export function SidebarUser() {

  const { user, setUser } = useAuthStore((state) => state);
  const { isMobile } = useSidebar()
  const router = useRouter();

  const logOut = async ()=>{
    await supabase.auth.signOut();
    setUser(null);
    router.navigate({to: "/"});
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ">
              <Avatar className="h-8 w-8 rounded-lg hover:cursor-pointer">
                <AvatarImage src={user?.user_metadata.picture} alt="avatar" />
                <AvatarFallback className="rounded-lg"><UserIcon className="size-4 rounded-lg"/></AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.user_metadata.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.user_metadata.picture} alt="avatar"/>
                    <AvatarFallback className="rounded-lg"><UserIcon className="size-4"/></AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.user_metadata.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={logOut} className="hover:cursor-pointer">
                <LogOut/> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
