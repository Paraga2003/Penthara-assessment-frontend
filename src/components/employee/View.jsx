import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from'axios' 


const View = () => {
  const {id} = useParams()
  const [employee , setEmployee] = useState(null)
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if(response.data.success){
          setEmployee(response.data.employee);
            
        }
      } catch (error) {
        console.log(error);
        console.log("Error is here")
      }
    };
    fetchEmployee();
  }, []);
  return (
    <>{employee?(
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
      <div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Name :</p>
          <p className='font-medium'>{employee.userId?.name}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Employee ID :</p>
          <p className='font-medium'>{employee.employeeId}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Date of Birth :</p>
          <p className='font-medium'>{new Date(employee.dob).toLocaleDateString()}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Department :</p>
          <p className='font-medium'>{employee.department?.dep_name}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Gender :</p>
          <p className='font-medium'>{employee.gender}</p>
        </div>
        <div className='flex space-x-3 mb-5'>
          <p className='text-lg font-bold'>Date of joining :</p>
          <p className='font-medium'>{new Date(employee.doj).toLocaleDateString()}</p>
        </div>

      </div>
      
    </div>
    ):<div>Loading ...</div>}
    </>
  )
}

export default View
