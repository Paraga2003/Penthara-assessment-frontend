
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
        const response = await axios.get("https://penthara-assessment-backend.vercel.app/api/departments", {
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
