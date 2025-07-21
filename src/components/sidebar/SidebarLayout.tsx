import * as React from "react"
import { PiggyBank, CreditCard, Banknote, CircleDollarSign, DiamondPercent  } from "lucide-react"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

export function SidebarLayout({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const items = [
    { title: "Tarjetas", url: "/tarjetas", icon: CreditCard },
    { title: "Efectivo", url: "/efectivo", icon: Banknote },
    { title: "Saldo", url: "/saldo", icon: CircleDollarSign },
    { title: "Rendimientos", url: "/rendimientos", icon: DiamondPercent }
  ]

  const sidebar = useSidebar();
  const { location } = useRouterState()
  const currentPath = location.pathname

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <div onClick={()=>sidebar.toggleSidebar()} className="flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground w-8 h-8 shrink-0 cursor-pointer">
                <PiggyBank className="size-4"/>
              </div>
              <div className="grid text-left text-sm leading-tight overflow-hidden">
                <span className="truncate font-medium">Finance</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>  
        <SidebarGroup>
          <SidebarGroupLabel>Finance</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className={item.url === currentPath ? "bg-muted font-semibold" : ""} tooltip={item.title}>
                  <Link to={item.url} className="flex items-center gap-3">
                    {item.icon && ( <item.icon className="size-4 shrink-0" />)}
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
