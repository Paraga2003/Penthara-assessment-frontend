 import axios from "axios";
import { useNavigate } from "react-router-dom";
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: "dob",
    selector: (row) => row.dob,
    sortable: true,
  },
  {
    name: "doj",
    selector: (row) => row.doj,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => <EmployeeButtons row={row} />,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

 export const fetchDepartments = async () => {
  let departments
  
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/departments", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if(response.data.success){
      departments = response.data.departments
        
              }
  } catch (error) {
    console.log(error.response?.data?.error || "Error fetching data");
  } 
  return departments;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate()
  return (
    <div >
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded mr-2"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded mr-2"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>

    </div>
  );
};