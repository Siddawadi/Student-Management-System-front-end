
import Sidebarcontents from '../sidebar/sidebar.contents'
import { Outlet } from 'react-router'


import { Header } from '../admin.header'
export const Adminlayout = () => {
  return (
    <main className='flex min-h-screen'>

      {/* Sidebar */}
      <div className='w-50 bg-olive-200 py-5'>
        <Sidebarcontents />
      </div>

      {/* Content area */}
      <div className='flex flex-col flex-1'>
        
        {/* Header on top */}
        <Header />

        {/* Page content below */}
        <div className='flex-1 bg-olive-200 p-4'>
          <Outlet />
        </div>

      </div>

    </main>
  )
}