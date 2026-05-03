


import type { IUser } from '../types/login.types'



interface Iprops {
    user:IUser
}

export const Profile = ({user}:Iprops) => {
    
  
  return (
    <div className='flex justify-between min-w-full p-5'>
       
        <img src={user.profile_image?.path} alt={"profile_image"} />

        
    </div>
  )
}
