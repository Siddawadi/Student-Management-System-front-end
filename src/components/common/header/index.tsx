
import Navcontents from './Nav.contents'
const Authprofile = ()=>{

  return(
    <img src="/profile.avif" alt="profile images" className='size-15 rounded-full'/>
  )
}
export const Header = () => {
  return (
    <div className='flex justify-between items-center h-20 rounded-b-xs
    bg-blue-300'>
     <Logo/>
     <Navcontents/>
      <Authprofile/>
    
    </div>
  )
}

 const Logo =()=>{

  return(
    <div className=' w-22 rounded-md p-2'>
    <img src="/logo.png" alt="logo" className='rounded-full' />
    </div>
  )
}