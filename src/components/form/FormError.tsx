import { cn } from "@/lib/utils"
import type { FieldError } from "react-hook-form"

type Props = {
    error?: FieldError, 
    className?: string
}

export default function FormError({error, className}: Props) {
  return (
    error && 
    <span className={cn("col-span-full block mt-1.5 ml-2 text-red-500 text-sm", className)}>
        {error.message}
    </span>
  )
}
