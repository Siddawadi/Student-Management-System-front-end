
import { Registerform } from '../../forms/register.form'

export const Registerpage = () => {
  return (
    <main className='min-h-screen h-screen bg-olive-200 flex flex-col justify-center items-center' >
        <div className='min-h-100 min-w-80 bg-white text-gray-400 border-2
       shadow-3xl shadow-2xl shadow-blue-950  rounded-2xl flex flex-col justify-center items-center gap-2'>
            <Registerform/>
        </div>
    </main>
  )
}
