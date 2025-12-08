import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/UserAuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')  
  const [error , setError] = useState(null) 
  const {login} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('https://penthara-assessment-backend.vercel.app/api/auth/login', {email, password});
      console.log("Login Successful:", response);
      if(response.data.success){
        login(response.data.user);
        localStorage.setItem("token" , response.data.token)
        
        if(response.data.user.role === 'admin'){
          navigate('/admin-dashboard');
        }else{
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("An error occurred. Please try again.");
      }
    }
    
  }

  return (
    <div className='flex flex-col items-center h-screen justify-center bg-linear-to-b from-teal-600 from from-50% to-gray-100 to-50% space-y-6'>
      <h1 className='font-extrabold text-5xl text-white'>Leave Management System </h1>
      <div className='border shadow p-6 w-80 bg-white rounded-lg'>
      
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700'>Email</label>
          <input type='email' className='w-full px-3 py-2 border' placeholder='Enter Email'  required
          onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700'>Password</label>
          <input type='password' className='w-full px-3 py-2 border' placeholder='Enter Password'  required 
          onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='mb-4 flex items-center justify-between'>
          <label className='inline-flex items-center'>
            <input type='checkbox' className='form-checkbox' />
            <span className='ml-2 text-gray-700'>Remember Me</span>
          </label>
          <a href='#' className='text-teal-600 hover:underline'>Forgot Password?</a>
        </div>
        <div className='mb-4'>
          <button type='submit' className='w-full bg-teal-600 text-white py-2  rounded hover:bg-teal-700 transition duration-300'>Login</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Login
