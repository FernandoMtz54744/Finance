export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-full">
        <div className="p-1 animate-spin drop-shadow-2xl bg-gradient-to-bl from-teal-400 via-purple-500 to-indigo-600 h-24 w-24 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-background"/>
    </div>
</div>
  );
}
