import React from 'react'
import { Header } from '../components/common/header'
import { Footer } from '../components/common/footer'
import { Outlet } from 'react-router'
export const Clientlayout = () => {
  return (
    <div>
        <Header/> 
        <Outlet/>
        
        <Footer/>

        
    </div>

    
  )
}
