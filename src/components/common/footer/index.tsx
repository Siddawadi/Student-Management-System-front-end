import { Link } from "react-router"


export const Footer = () => {
  return (
    <footer className=' h-60 flex flex-col '>
        <div className='bg-cyan-500 h-55 flex   '>
          <div className='min-h-full w-full flex flex-col  justify-center-safe text-amber-100 px-5'>
            <p   > <Link to="/aboutus" className='font-semibold hover:underline p-25 '  > About us</Link></p>
           <p className='  px-10 '> Student Management System</p>
          <p  className='  px-25 '> ABC College</p>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p>
          <p> </p> 
         
          </div>
           <div className="bg-red-800 w-full flex flex-col items-center justify-center text-amber-100">
           <p className="shadow-sky-400 font-semibold"  >  Navigation</p>
           <p> Dashboard</p>
          <p  className='  px-15 '> Faculty</p>
          <p  className='  px-15 '> Courses</p>
          <p  className='  px-15 '> Attendance</p>
          <p  className='  px-15 '> Grades</p>
          </div>
          <div className="bg-black w-full flex flex-col items-center justify-center text-amber-100">
          <p className="shadow-sky-400 font-semibold"  >  Contact & Support </p>
          
          <p  className='  px-15 '> +977 9841236547 </p>
          <p  className='  px-15 '> support@gmail.com</p>
         <p  className='  px-15 '> Bagbazar, kathmandu</p>
          </div>

          <div className='w-full flex items-center justify-center  '>
     <p>icons</p>
          </div>
            
         

        </div>

        <div className="flex  justify-between items-center h-12 ">
          
 
      <Logo/>
      <p className="text-xs">© 2026 ABC College</p>
      <div></div>
        </div>
    

    </footer>
  )
}
 const Logo =()=>{

  return(
    <div className=' w-22 rounded-md p-2'>
    <img src="/logo.png" alt="logo" className='h-12 ' />
    </div>
  )
}
