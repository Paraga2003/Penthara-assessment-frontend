import React from 'react'
import { useAuth } from '../context/UseruthContext.jsx'
import { Navigate } from 'react-router-dom';

const UserPrivateRoute = ({children}) => {
  const {user , loading} = useAuth();
  if(loading){
    return <div>Loading...</div>
  }
  return user ? children : <Navigate to="/login"/>;
}

export default UserPrivateRoute