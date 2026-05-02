
import { Loginform } from '../../forms/login.form'
export const LoginPage = () => {
  return (
     <main className='min-h-screen h-screen bg-olive-200 flex flex-col justify-center items-center' >
            <div className='border-blue-300 border min-h-80 w-80 bg-white shadow-2xl
             shadow-blue-950 rounded-2xl flex flex-col justify-start items-center gap-2
              text-gray-400'>
               <Loginform/>
            </div>
        </main>
  )
}
