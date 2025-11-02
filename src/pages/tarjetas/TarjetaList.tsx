import type { Tarjeta } from "@/types/tarjeta"
import TarjetaCard from "./TarjetaCard"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import {  useRouter } from "@tanstack/react-router"
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    tarjetas: Tarjeta[]
}

export default function TarjetaList({tarjetas}: Props) {
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 place-items-center gap-8 p-8">
            {tarjetas.map((tarjeta)=>(
                <ContextMenu key={tarjeta.id}>
                    <ContextMenuTrigger>
                        <TarjetaCard tarjeta={tarjeta}></TarjetaCard>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem className="hover:cursor-pointer"
                            onClick={() => router.navigate({ to: "/tarjetas/edit", search:{tarjeta: tarjeta}, mask:{ to: "/tarjetas/edit"} })}>
                            Editar
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            ))}

            <Skeleton onClick={() => router.navigate({ to: "/tarjetas/add"})}
            className={cn("group w-2xs h-38 md:h-full !animate-none flex justify-center items-center hover:cursor-pointer", tarjetas.length === 0 && "md:h-38")}>    
                <Plus className="h-15 w-15 opacity-35 group-hover:opacity-100 transition-opacity duration-300" />
            </Skeleton>
        </div>
    )
}
