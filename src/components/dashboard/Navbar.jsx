import React from 'react'
import { useAuth } from '../../context/UserAuthContext.jsx'

const Navbar = () => {
  const {user , logout} = useAuth();
  return (
    <div className='flex items-center text-white justify-between h-20 bg-teal-600 px-8'>
      <p className='text-2xl' >Welcome {user.name} </p>
      <button onClick={logout} className='px-4 py-1 bg-teal-700 hover:bg-teal-800'>Logout</button>
    </div>
  )
}

export default Navbar
