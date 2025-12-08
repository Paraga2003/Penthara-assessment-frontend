import React from 'react'
import Sidebar from '../components/employeeDashBoard/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar.jsx'


const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet />

      </div>
      
    </div>
  )
}

export default Dashboard
