import Navbar from '@/components/ui/navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <div className='flex flex-col  min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-16 '>
            <Outlet/>
        </div>
    </div>
  )
}

export default Mainlayout;