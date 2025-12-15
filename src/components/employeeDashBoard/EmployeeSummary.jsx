import React, { useEffect, useState } from 'react'
import SummaryCard from '../dashboard/SummaryCard'
import { FaScaleBalanced , FaFile , FaCheck ,FaHourglassHalf , FaTimeline  } from 'react-icons/fa6'
import axios from 'axios'

const EmployeeSummary = () => {
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
  return (
    <>{summary ? (
    <div className='p-6 '>
      <h3 className='text-3xl font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3  gap-4 mt-6'>
        {console.log(summary)}
        <SummaryCard icon={<FaScaleBalanced/>} text="Leave Balance" number={summary.leaveBalance} color="bg-teal-600" />
      </div>  
      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <SummaryCard icon={<FaFile/>} text="Total Leaves Applied" number={summary.totalLeavesApplied} color="bg-teal-600" />
          <SummaryCard icon={<FaCheck/>} text="Leaves Approved" number={summary.approvedThisMonth} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf/>} text="Leaves Pending" number={summary.pendingThisMonth} color="bg-yellow-600" />
          <SummaryCard icon={<FaTimeline/>} text="Leaves Rejected" number={summary.rejectedThisMonth} color="bg-red-600" />
          
        </div>
      
    </div>
    </div>
    ):<div>Loading...</div>}</>
  )
}

export default EmployeeSummary
