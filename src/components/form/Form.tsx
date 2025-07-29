import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideProps } from "lucide-react"

type props = {
    title: string,
    description?: string,
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    children: React.ReactNode,
    className?: string
    onSubmit: ()=>void
}

export function Form({title, description, icon: Icon, onSubmit, children, className, ...props}: props) {
  return (
    <Card className="mx-6 w-screen md:w-4xl self-center mt-5">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-xl flex flex-row gap-x-2">
          {Icon && <Icon className="w-8 h-8"/>}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} {...props} autoComplete="off" className={cn("form-finance space-y-6", className)}>
          {children}
        </form>
      </CardContent>
    </Card>
  )
}
