

import React, { useContext } from 'react'
import type { IUser } from '../types/login.types'
import { AuthContext } from '../context/auth.context'


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
