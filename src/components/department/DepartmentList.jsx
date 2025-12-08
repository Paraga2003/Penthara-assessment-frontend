// import React, { useState , useEffect} from 'react'
// import {Link} from 'react-router-dom';
// import {DataTable} from 'react-data-table-component'
// import {columns, DepartmentButtons} from '../../utils/DepartmentHelper.jsx';
// import axios from 'axios';


// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]);
//   const [depLoading , setDepLoading] = useState(false)
//   useEffect(()=>{
//     const fetchDeaprtments = async () => {
//       setDepLoading(true)
//       try {
//         const response = await axios.get('http://localhost:3000/api/departments' , {
//           headers:{
//             "Authorization": `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         if(response.data.success){
//           let sno = 1
//           const data = await response.data.departments.map((dep)=>({
//             _id : dep._id,
//             sno : sno++,
//             dep_name : dep.dep_name,
//             action: (<DepartmentButtons _id={dep._id}/>)
//           }))
//           setDepartments(data);
//         }
//       } catch (error) {
//         if(error.response && !error.response.data.success ){
//           console.log(error.response.data.error);
//         }else{
//           console.log("An error occurred. Please try again.");
//         }
//       }
//       finally{
//         setDepLoading(false)
//       }
//     };
//     fetchDeaprtments();

//   },[])
//   return (
//     <>{depLoading ? <div>Loading ...</div>:

//     <div className='p-5'>
//       <div className='text-center'>
//         <h3 className='text-2xl font-bold'>
//           Manage Departments
//         </h3>
//       </div>
//       <div className='flex justify-between items-center'>
//         <input type="text" placeholder='Search By Dep Name' className='px-4 py-0.5 bg-white border ' />
//         <Link to="/admin-dashboard/add-new-department" className='px-4 py-1 bg-teal-600 rounded text-white' >Add New Department</Link>
//       </div>
//       <div>
//         <DataTable
//         columns={columns} data={departments}
//         />

//       </div>
//     </div>
//     }</>
//   )
// }

// export default DepartmentList
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DepartmentButtons } from "../../utils/DepartmentHelper";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const onDepartmentDelete = async (id) => {
    const data = departments.filter((dep) => dep._id !== id);
    setDepartments(data);
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/departments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if(response.data.success){
            let sno = 1
                    const data = await response.data.departments.map((dep)=>({
                      _id : dep._id,
                      sno : sno++,
                      dep_name : dep.dep_name,
                      description : dep.description,
                      action: (<DepartmentButtons Id={dep._id}/>)
                    }))
                    setDepartments(data);
                    setFilteredDepartments(data);
                  }
      } catch (error) {
        console.log(error.response?.data?.error || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);
  const filterDepartments = async (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>
          Manage Departments
       </h3>
     </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="px-3 py-1 border rounded"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add-new-department"
          className="px-4 py-1 bg-teal-600 text-white rounded"
        >
          Add Department
        </Link>
      </div>

      <table className="min-w-full border text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-1">S No</th>
            <th className="border px-3 py-1">Name</th>
            <th className="border px-3 py-1">Description</th>
            <th className="border px-3 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((dep) => (
            <tr key={dep._id}>
              <td className="border px-3 py-1">{dep.sno}</td>
              <td className="border px-3 py-1">{dep.dep_name}</td>
              <td className="border px-3 py-1">{dep.description}</td>
              <td className="border px-3 py-1">
                {/* <button
                  className="text-blue-600 mr-2"
                  onClick={() => console.log("Edit", dep._id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => console.log("Delete", dep._id)}
                >
                  Delete
                </button> */}
                <DepartmentButtons onDepartmentDelete={onDepartmentDelete} Id={dep._id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
