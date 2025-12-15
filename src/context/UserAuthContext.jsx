import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const userContext = createContext();
const UserAuthContext = ({children}) => {
  const [user , setUser] = useState(null);

  const [loading , setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(()=>{
    const verifyUser = async()=>{
        try{
          const token = localStorage.getItem('token');
          if(token){
          const res = await axios.get('http://localhost:3000/api/auth/verify' , {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }) 
          if(res.data.success){
            setUser(res.data.user);
          }
          else{
            setUser(null);
          }
        }}catch(err){
          if(err.response && !err.response.data.error){
            setUser(null)
        }
      }
      finally{
        setLoading(false);
      }
    }
    verifyUser();
  

  } , [])

  const login = (user) => {
    setUser(user)
    
  }
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  }
  return (
    <userContext.Provider value={{user , login , logout , loading}}>
      {children}
    </userContext.Provider>
  )
}

const useAuth = ()=> useContext(userContext);

export default UserAuthContext 
export {useAuth};