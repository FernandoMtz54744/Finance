import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { DateTime } from "luxon"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { es } from "date-fns/locale"

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string,
  minDate?: Date,
  maxDate?: Date,
  defaultDate?: Date
}

export function DatePicker({ value, onChange, placeholder, minDate, maxDate, defaultDate }: DatePickerProps) {
    return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? DateTime.fromJSDate(value).toFormat("dd/MMM/yyyy") : <span>{placeholder ?? "Pick a date"}</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
            <Calendar mode="single" selected={value} onSelect={onChange} locale={es} autoFocus 
                disabled={(date) => (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false)}
                hidden={[...(minDate ? [{ before: minDate }] : []), ...(maxDate ? [{ after: maxDate }] : [])]} 
                defaultMonth={value ?? defaultDate ?? minDate} />
        </PopoverContent>
    </Popover>
)}
