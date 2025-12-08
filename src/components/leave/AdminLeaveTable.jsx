import React, { useEffect, useState } from 'react'
import { LeaveButtons } from '../../utils/LeaveHelper.jsx';
import axios from 'axios';

const AdminLeaveTable = () => {
  const [leaves , setLeaves] = useState(null)
  const [filteredLeaves , setFilteredLeaves] = useState(null)
  const fetchLeaves = async () =>{
    try {
              const token = localStorage.getItem("token");
              const response = await axios.get("http://localhost:3000/api/leave", {
                headers: { Authorization: `Bearer ${token}` },
              });
              if(response.data.success){
                  let sno = 1
                          const data = await response.data.leaves.map((leave)=>({
                            _id : leave._id,
                            sno : sno++,
                            employeeId: leave.employeeId.employeeId,
                            department : leave.employeeId.department.dep_name,
                            name: leave.employeeId.userId.name,
                            days: Math.ceil(
                              (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
                            ),
                            status: leave.status,
                            action: (<LeaveButtons id={leave._id}/>)
                          }))
                          setLeaves(data);
                          setFilteredLeaves(data)
                        }
            } catch (error) {
              console.log(error)
              console.log(error.response?.data?.error || "Error fetching data");
            }

  }
  useEffect(()=>{
    fetchLeaves()

  },[])
  const filterByInput = (e)=>{
    const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredLeaves(data)
  }
  const filterByButton = (status)=>{
    const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
    setFilteredLeaves(data)
  }

  
  return (
    <>{filteredLeaves ? (
    <div className='p-6'>
      <div className='text-center'>
                <h3 className='text-2xl font-bold'>
                    Manage Leaves
                </h3>
            </div>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search By Emp Id"
                className="px-3 py-1 border rounded"
                onChange={filterByInput}
              />
              <div className='space-x-3'>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-md'
                onClick={()=> filterByButton("Pending")}
                >Pending</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-md'
                onClick={()=> filterByButton("Approved")}
                >Approved</button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 rounded-md'
                onClick={()=> filterByButton("rejected")}
                >Rejected</button>
              </div>
              
            </div>
            <table className="min-w-full border mt-6 text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-1">S No</th>
                  <th className="border px-3 py-1">Emp ID</th>
                  <th className="border px-3 py-1">Name</th>
                  <th className="border px-3 py-1">Department</th>
                  <th className="border px-3 py-1">Days</th>
                  <th className="border px-3 py-1">Status</th>
                  <th className="border px-3 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((leave) => (
                  <tr key={leave._id}>
                    <td className="border px-3 py-1">{leave.sno}</td>
                    <td className="border px-3 py-1">{leave.employeeId}</td>
                    <td className="border px-3 py-1">{leave.name}</td>
                    <td className="border px-3 py-1">{leave.department}</td>
                    <td className="border px-3 py-1">{leave.days}</td>
                    <td className="border px-3 py-1">{leave.status}</td>
                    <td className="border px-3 py-1">
                      <LeaveButtons id={leave._id}/>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
      
    </div>
  ):<div>Loading...</div>}</>
  )
}

export default AdminLeaveTable
