import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaGauge, FaUser } from "react-icons/fa6";


const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-600 h-20 flex items-center justify-center '>
        <h3 className='text-2xl text-center '>Leave Management System</h3>
      </div>
      <div className='px-4'>
        <NavLink to="/admin-dashboard"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 ${
            isActive
              ? "bg-teal-500 text-white font-semibold"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }
        end
        >
          <FaGauge/>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard/employees"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 ${
            isActive
              ? "bg-teal-500 text-white font-semibold"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }>
          <FaUser/>
          <span>Employees</span>
        </NavLink>
        <NavLink to="/admin-dashboard/departments"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 ${
            isActive
              ? "bg-teal-500 text-white font-semibold"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }>
          <FaBuilding/>
          <span>Departments</span>
        </NavLink>
        <NavLink to="/admin-dashboard/leaves"
        
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 ${
            isActive
              ? "bg-teal-500 text-white font-semibold"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }>
          <FaGauge/>
          <span>Leaves</span>
        </NavLink>
      </div>
      
    </div>
  )
}

export default AdminSidebar
