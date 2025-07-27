import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/periodos/$id')({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    console.log(params.id);
    
  }
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <div>Hello "/periodos/ {id}"!</div>
}
