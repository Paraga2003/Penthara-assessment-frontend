import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext.jsx';
import axios from 'axios';

const LeaveList = () => {
  const user = useAuth()

  const [leaves , setLeaves] = useState(null)
  let sno = 1;
  const {id} = useParams()
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
const fetchLeaves = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if(response.data.success){
        setLeaves(response.data.leaves)
  }}catch (error) {
    console.log(error)
    console.log(error.response?.data?.error || "Error fetching data");
  } 
};
  useEffect(()=>{
    fetchLeaves()
  },[id])
  return (
    <>{leaves && summary ? (
    <div className='p-6'>
      <div className='text-center'>
          <h3 className='text-2xl font-bold'>
              Leave History
          </h3>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border rounded"
        />
        {summary.leaveBalance!==0 && user.user.role === "employee" && 
        <Link
          to="/employee-dashboard/LeaveForm"
          className="px-4 py-1 bg-teal-600 text-white rounded"
        >
          Add New Leave
        </Link>
        }
      </div>

      <table className="min-w-full border mt-6 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-6 py-3">S No</th>
              <th className="border px-6 py-3">FROM</th>
              <th className="border px-6 py-3">TO</th>
              <th className="border px-6 py-3">REASON</th>
              <th className="border px-6 py-3">APPLIED DATE</th>
              <th className="border px-6 py-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="border px-6 py-3">{sno++}</td>
                <td className="border px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="border px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="border px-6 py-3">{leave.reason}</td>
                <td className="border px-6 py-3">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                <td className="border px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>):<div className='text-center text-4xl'>Loading...</div>}</>
  )
}

export default LeaveList
