import React from 'react'

const List = () => {
  return (
    <div className='p-6'>
      <div className='text-center'>
                    <h3 className='text-2xl font-bold'>
                      Leave History
                   </h3>
                 </div>
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="px-3 py-1 border rounded"
                      onChange={handleFilter}
                    />
                    <Link
                      to="/employee-dashboard/add-leave"
                      className="px-4 py-1 bg-teal-600 text-white rounded"
                    >
                      Add New Leave
                    </Link>
                  </div>
      
    </div>
  )
}

export default List
