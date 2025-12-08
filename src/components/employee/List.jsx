import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EmployeeButtons } from '../../utils/EmployeeHelper';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper';

const List = () => {
  const [employees , setEmployees] = useState([]);
  const [loading , setLoading] = useState(false);
  const [filteredEmployee , setFilteredEmployee] = useState([])
  useEffect(() => {
      const fetchEmployees = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/api/employee", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if(response.data.success){
              let sno = 1
                      const data = await response.data.employees.map((emp)=>({
                        _id : emp._id,
                        sno : sno++,
                        dep_name : emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        doj: new Date(emp.doj).toLocaleDateString(),
                        action: (<EmployeeButtons Id={emp._id}/>)
                      }))
                      setEmployees(data);
                      setFilteredEmployee(data);
                    }
        } catch (error) {
          console.log(error.response?.data?.error || "Error fetching data");
        } finally {
          setLoading(false);
        }
      };
      fetchEmployees();
    }, []);
    const handleFilter = (e) => {
      const value = e.target.value.toLowerCase();
      const records = employees.filter(emp =>
        emp.name.toLowerCase().includes(value)
      );
      setFilteredEmployee(records);
    };
    
  return (
    <div className='p-6'>
      <div className='text-center'>
              <h3 className='text-2xl font-bold'>
                Manage Employees
             </h3>
           </div>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search by Name"
                className="px-3 py-1 border rounded"
                onChange={handleFilter}
              />
              <Link
                to="/admin-dashboard/add-employee"
                className="px-4 py-1 bg-teal-600 text-white rounded"
              >
                Add New Employee
              </Link>
            </div>
            {/* <div>
              <DataTable
              columns={columns} data={employees} progressPending={loading}
              />  
            </div> */}
            <table className="min-w-full border mt-6 text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-1">S No</th>
                        <th className="border px-3 py-1">Name</th>
                        <th className="border px-3 py-1">department</th>
                        <th className="border px-3 py-1">dob</th>
                        <th className="border px-3 py-1">doj</th>
                        <th className="border px-3 py-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployee.map((emp) => (
                        <tr key={emp._id}>
                          <td className="border px-3 py-1">{emp.sno}</td>
                          <td className="border px-3 py-1">{emp.name}</td>
                          <td className="border px-3 py-1">{emp.dep_name}</td>
                          <td className="border px-3 py-1">{emp.dob}</td>
                          <td className="border px-3 py-1">{emp.doj}</td>
                          <td className="border px-3 py-1">
                            <EmployeeButtons Id={emp._id}/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
      
      
    </div>
  )
}

export default List
