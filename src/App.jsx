import React from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary'

import DepartmentList from './components/department/DepartmentList.jsx'
import AddDepartment from './components/department/AddDepartment.jsx'
import EditDepartment from './components/department/EditDepartment.jsx'
import List from './components/employee/List.jsx'
import Add from './components/employee/Add.jsx'
import View from './components/employee/View.jsx'
import Edit from './components/employee/Edit.jsx'
import EmployeeSummary from './components/employeeDashBoard/EmployeeSummary.jsx'
import LeaveList from './components/leave/LeaveList.jsx'
import LeaveForm from './components/leave/LeaveForm.jsx'
import LeaveDetail from './components/leave/LeaveDetail.jsx'
import AdminLeaveTable from './components/leave/AdminLeaveTable.jsx'
import UserPrivateRoute from './utils/UserPrivateRoute.jsx'


const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        {/* <Route path='/employee-dashboard' element={<Dashboard/>} ></Route> */}
        <Route path='/admin-dashboard' element={
          <UserPrivateRoute>
            <RoleBasedRoutes requiredRole={['admin']}>
            <AdminDashboard/>
            </RoleBasedRoutes>
          </UserPrivateRoute>
            
          
          }>
            <Route index element={<AdminSummary/>}></Route>
            <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>
            <Route path='/admin-dashboard/add-new-department' element={<AddDepartment/>}></Route>
            <Route path='/admin-dashboard/departments/:id' element={<EditDepartment/>}></Route>
            <Route path='/admin-dashboard/employees' element={<List/>}></Route>
            <Route path='/admin-dashboard/add-employee' element={<Add/>}></Route>
            <Route path='/admin-dashboard/employees/:id' element={<View/>}></Route>
            <Route path='/admin-dashboard/employees/edit/:id' element={<Edit/>}></Route>
            <Route path='/admin-dashboard/leaves' element={<AdminLeaveTable/>}></Route>
            <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetail/>}></Route>
            <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList/>}></Route>


            


        </Route>
        <Route 
          path='/employee-dashboard'
          element={
            <UserPrivateRoute>
              <RoleBasedRoutes requiredRole={["admin" , 'employee']}>
              <Dashboard/>
              </RoleBasedRoutes>
            </UserPrivateRoute>
              
          }>
            <Route index element={<EmployeeSummary/>}></Route>
            
            
            <Route path='/employee-dashboard/leaveForm' element={<LeaveForm/>}></Route>
            <Route path='/employee-dashboard/leaveHistory/:id' element={<LeaveList/>}></Route>


          </Route>
          <Route path='/unauthorized' element={<Login/>}> 

          </Route>
        
      </Routes>

  )
}

export default App
