
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
  const {id} = useParams();
  const [department, setDepartment] = useState({dep_name:'', description:''});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => { 
    const {name , value} = e.target;
    setDepartment({...department , [name]:value })

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
          const response = await axios.put(`https://penthara-assessment-backend.vercel.app/api/departments/${id}`, department , {
            headers:{
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
          if(response.data.success){
            navigate('/admin-dashboard/departments');
    
          }
        } catch (error) {
          if(error.response && !error.response.data.success ){
            console.log(error.response.data.error);
          }else{
            console.log("An error occurred. Please try again.");
          }
          
        }
  }
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/departments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if(response.data.success){
          setDepartment(response.data.department);
            
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);
  return (
    <>{loading ? <div>Loading...</div> :
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h2 className='text-2xl font-bold mb-6 '>Edit Department</h2>
      <form onSubmit={handleSubmit} >
        <div className='mt-3'>
          <label htmlFor='dep_name' className='text-sm font-medium text-gray-700'>Department Name</label>
          <input type="text" value={department.dep_name} placeholder='Department Name' onChange={handleChange} className=' mt-1 w-full p-2  border border-gray-300 rounded-md' name='dep_name' required/>
        </div>
        <div className='mt-3'>
          <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
          <textarea name="description" value={department.description} placeholder='description' onChange={handleChange} className=' block mt-1 w-full p-2  border border-gray-300 rounded-md' rows="4"></textarea>
        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded '>Edit Department</button>
      </form>
    </div>
    }</>
    
)
}

export default EditDepartment
