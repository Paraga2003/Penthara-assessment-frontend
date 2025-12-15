import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/UserAuthContext'
import { useNavigate } from 'react-router-dom'

const LeaveForm = () => {
  const {user} = useAuth()
  const [leave , setLeave] = useState({
    userId: user._id,
    
  })
  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:3000/api/leave/add`,leave, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(response.data.success){
        navigate(`/employee-dashboard/leaveHistory/${user._id}`)
        
      }
    } catch (error) {
      console.log(error);
  
    }

  }
  const [summary , setSummary] = useState(null)
    useEffect(()=>{
      const  fetchSummary = async () => {
        try {
          const res = await axios.get('http://localhost:3000/api/dashboard/employee/summary',{
            headers :{
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(res.data.success){
            setSummary(res.data.leaveSummary);
          }
          
        } catch (error) {
          if(error.response){
            alert(error.response.data.error)
          }
          console.log(error.message)
        }
      }
      fetchSummary()
  
    },[])
  const handleChange = (e)=>{
    const {name , value} = e.target
    setLeave((prevState)=>({
      ...prevState,
      [name]:value
    }))

  }
  return (
    <>{summary ?(
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Leave Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4' >
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                From Date
              </label>
              <input
              type='date'
              name='startDate'
              onChange={handleChange}
              value={leave.startDate || ""}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                To Date
              </label>
              <input
              type='date'
              name='endDate'
              onChange={handleChange}
              value={leave.endDate || ""}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
              />
            </div>

          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Reason
            </label>
            <textarea
            name='reason'
            placeholder='Reason for Leave'
            onChange={handleChange}
            value={leave.reason || ""}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            required
            ></textarea>
          </div>
          
        </div>
        {summary.leaveBalance !==0 &&
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Request Leave
        </button>
        }
      </form>
    </div>
    ) : <div>Loading...</div> } </>
  )
}

export default LeaveForm
