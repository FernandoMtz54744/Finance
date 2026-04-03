import { cn } from "@/lib/utils"
import { Calendar, CircleCheckBig, ClockArrowDown, ClockPlus } from "lucide-react"
import type React from "react"

type Props = {
  title: string,
  onClick?: ()=> void,
  className?: string,
  validado?: boolean,
  isActual?: boolean,
  isPendienteValidacion?: boolean, //Es pendiente solo si la fecha ya pasó ese periodo
  isPendientePeridoActual?: boolean,
  children: React.ReactNode
}

export default function TimelineItem({ title, onClick, className, children, validado, isActual, isPendienteValidacion, isPendientePeridoActual}: Props) {
  return (
    <div className={cn("grid gap-1 text-sm relative", className)} onClick={onClick}>
        <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-emerald-500" />
        <div className="text-lg font-bold flex flex-row items-center">{title} 
          {validado &&  <span title="Periodo validado" className="ml-2 flex">
            <CircleCheckBig className="size-5 text-emerald-500" />
          </span>}
          {isActual && 
          <span title="Periodo actual" className="ml-2 flex">
            <Calendar className="size-5 text-blue-500"/>
          </span>}
          {isPendienteValidacion && 
          <span title="Periodo pendiente de validación" className="ml-2 flex">
            <ClockArrowDown className="size-5 text-red-500"/>
          </span>}
          {isPendientePeridoActual && 
          <span title="Falta agregar periodo actual" className="ml-2 flex">
            <ClockPlus className="size-5 text-red-500"/>
          </span>}
        </div>
        <div className="text-gray-500 dark:text-gray-300">
          {children}
        </div>
    </div>
  )
}
