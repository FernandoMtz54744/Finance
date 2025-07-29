import { useNavigate } from "@tanstack/react-router"

export default function Landing() {
  const navigate = useNavigate(); 

  return (
    <div>
      Landing pages
      <br />
      <button onClick={()=> navigate({to:"/login"})}>Login</button>
    </div>
  )
}
