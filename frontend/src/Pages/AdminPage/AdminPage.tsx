import Sidebar from 'Modules/Sidebar/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 m-6 rounded-2xl bg-white shadow-xl p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPage
