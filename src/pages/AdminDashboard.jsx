import React, { useEffect } from 'react'
import { useAuth } from '../context/UserAuthContext.jsx'
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx';
import Navbar from '../components/dashboard/Navbar.jsx';
import AdminSummary from '../components/dashboard/AdminSummary.jsx';

const AdminDashboard = () => {
  const {user , loading} = useAuth();
  const navigate = useNavigate()
  if(loading){
    return <div>Loading...</div>
  }
  
    if (!user) {
      navigate("/login");
    }
  

  return (
    <div className='flex'>
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar/>
        <Outlet />

      </div>
      
    </div>
  )
}

export default AdminDashboard
