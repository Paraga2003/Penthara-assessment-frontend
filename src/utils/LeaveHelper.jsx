import { useNavigate } from "react-router-dom"

export const LeaveButtons = ({id}) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/admin-dashboard/leaves/${id}`)
  }
  return (
    <button
    onClick={handleView} 
    className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
    >
      View
    </button>
  )
}

