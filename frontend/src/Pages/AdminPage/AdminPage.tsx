import Sidebar from 'Modules/Sidebar/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 m-3 rounded-xl bg-white shadow-2xl p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage
