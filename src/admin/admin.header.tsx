import { Profile } from "./profile"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { useMutation } from "@tanstack/react-query"
import { logoutFn } from "../api/auth.api"
import { useNavigate } from "react-router"

export const Header = () => {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      setUser(null)
      navigate("/")
    }, 
    onError: (error) => {
      console.error(error)
    }
  })

  return (
    <div className='flex justify-between items-center h-20 px-6 bg-blue-300 w-[90vw]'>
      
   
     <p className='font-semibold text-lg'>Admin Panel</p>
      <div className='flex items-center gap-4 justify-between'>
        {user && <Profile user={user} />}
          
        
 </div>
        <button
          onClick={() => logout()}
          disabled={isPending}
          className='bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 disabled:opacity-50'
        >
          {isPending ? "Logging out..." : "Logout"}
        </button>
     

    </div>
  )
}