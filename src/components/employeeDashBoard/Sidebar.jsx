import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { FaHistory, FaTachometerAlt, FaWpforms } from "react-icons/fa";
import { useAuth } from '../../context/UserAuthContext';


const Sidebar = () => {
  const { user, loading } = useAuth();
  const userId = user._id || user.id

  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-600 h-20 flex items-center justify-center '>
        <h3 className='text-2xl text-center '>Leave Management System</h3>
      </div>
      <div className='px-4'>
        <NavLink to="/employee-dashboard"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 ${
            isActive
              ? "bg-teal-500 text-white font-semibold"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }
        end
        >
          <FaTachometerAlt/>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/employee-dashboard/leaveForm"
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 ${
            isActive
              ? "bg-teal-500 text-white font-semibold"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }>
          <FaWpforms/>
          <span>Leave Form</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/leaveHistory/${userId}`}
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2.5 px-4 rounded transition-all duration-200 ${
            isActive
              ? "bg-teal-500 text-white font-semibold"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`
        }>
          <FaHistory/>
          <span>Leave History</span>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar
