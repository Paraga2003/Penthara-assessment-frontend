
import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name:"",
    designation:"",
    department:""
  });
  const [departments , setDepartments] = useState(null)
  const {id} = useParams()
  useEffect(() => {
      const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
      };
      getDepartments();
    }, []);
  useEffect(() => {
    const fetchEmployee = async () => {
      console.log("ID from URL:", id);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        
        if(response.data.success){
          const employee = response.data.employee
          setEmployee((prev)=>({...prev , name:employee.userId.name , designation:employee.designation , department:employee.department }));
            
        }
      } catch (error) {
        console.log(error);
        console.log("Error is here")
      }
    };
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/edit/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  return (
    <>{departments && employee ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name }
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          
          
          
          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          
          
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Employee
        </button>
      </form>
    </div>
    ) : <div>Loading...</div> }</>
  );
};

export default Edit;

