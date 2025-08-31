export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="p-4 text-red-600">
      Ocurrió un error: {error.message}
    </div>
  )
}