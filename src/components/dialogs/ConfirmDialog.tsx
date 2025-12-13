import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

type Props = {
    children: React.ReactNode,
    title: string,
    description: string,
    confirmText: string,
    cancelText: string,
    confirmAction: ()=> void
}

export default function ConfirmDialog({children, title, description, confirmText, cancelText, confirmAction}: Props) {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger >
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="hover:cursor-pointer">{cancelText}</AlertDialogCancel>
                <AlertDialogAction className="hover:cursor-pointer" onClick={confirmAction}>{confirmText}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
