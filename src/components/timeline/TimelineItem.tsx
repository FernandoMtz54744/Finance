import { cn } from "@/lib/utils"
import type React from "react"

type Props = {
  title: string,
  onClick?: ()=> void,
  className?: string,
  children: React.ReactNode
}

export default function TimelineItem({ title, onClick, className, children }: Props) {
  return (
    <div className={cn("grid gap-1 text-sm relative", className)} onClick={onClick}>
        <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-emerald-500" />
        <div className="text-lg font-bold">{title}</div>
        <div className="text-gray-500 dark:text-gray-300">
          {children}
        </div>
    </div>
  )
}
