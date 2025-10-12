type Props = {
  children: React.ReactNode
}

export default function Timeline({children} : Props) {
  return (
    <div className="p-6 md:p-10">
      <div className="after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-emerald-500">
        {children}
      </div>
    </div>
  )
}
