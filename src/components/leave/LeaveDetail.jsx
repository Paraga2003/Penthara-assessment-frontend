
import React, { useState , useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from'axios' 


const LeaveDetail = () => {
  const {id} = useParams()
  const [leave , setLeave] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://penthara-assessment-backend.vercel.app/api/leave/detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if(response.data.success){
          setLeave(response.data.leave);
            
        }
      } catch (error) {
        console.log(error);
        console.log("Error is here")
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id , status)=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`https://penthara-assessment-backend.vercel.app/api/leave/${id}`,{status}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if(response.data.success){
        navigate('/admin-dashboard/leaves')
      }
    } catch (error) {
      console.log(error);
      console.log("Error is here")
    }

  }
  return (
    <>{leave?(
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
      <div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Name :</p>
          <p className='font-medium'>{leave.employeeId.userId?.name}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Employee ID :</p>
          <p className='font-medium'>{leave.employeeId.employeeId}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Reason :</p>
          <p className='font-medium'>{leave.reason}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Department :</p>
          <p className='font-medium'>{leave.employeeId.department?.dep_name}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Start Date :</p>
          <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>End Date :</p>
          <p className='font-medium'>{new Date(leave.endDate).toLocaleDateString()}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>
            {leave.status === "Pending" ? "Action :": "Status :"}
          </p>
          {leave.status === "Pending" ? (
            <div className='flex space-x-2'>
              <button className='px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600'
              onClick = {()=> changeStatus(leave._id , "Approved")}
              >Approve</button>
              <button className='px-4 py-1 bg-red-500 rounded text-white hover:bg-red-600'
              onClick = {()=> changeStatus(leave._id , "Rejected")}
              >Reject</button>
            </div>
          ):<p className='font-medium'>{leave.status}</p>}
          
        </div>

      </div>
      
    </div>
    ):<div>Loading ...</div>}
    </>
  )
}

export default LeaveDetail
