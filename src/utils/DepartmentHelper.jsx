// // utils/DepartmentHelper.jsx
// import React from "react";

// export const DepartmentButtons = ({ row }) => {
//   return (
//     <div>
//       <button
//         className="text-blue-600 mr-2"
//         onClick={() => console.log("Edit", row._id)}
//       >
//         Edit
//       </button>

//       <button
//         className="text-red-600"
//         onClick={() => console.log("Delete", row._id)}
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export const columns = [
//   {
//     name: "S No",
//     selector: (row) => row.sno,
//   },
//   {
//     name: "Department Name",
//     selector: (row) => row.dep_name,
//   },
//   {
//     name: "Action",
//     cell: (row) => row.action || <DepartmentButtons row={row} />,
//   },
// ];
// utils/DepartmentHelper.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Action buttons for each row
export const DepartmentButtons = ({ Id , onDepartmentDelete }) => {
  const navigate = useNavigate()
  const  handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this department?");
    if(confirm){
    try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:3000/api/departments/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            
            if(response.data.success){
              onDepartmentDelete(id);
              
                
            }
          } catch (error) {
            console.log(error);
          }
        }

  }
  return (
    <div>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded mr-2text-blue-600 mr-2"
        onClick={() => navigate(`/admin-dashboard/departments/${Id}`)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded mr-2text-red-600"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};

// Columns for DataTable
export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => <DepartmentButtons row={row} />,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
