import Sidebar from 'Modules/Sidebar/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const AdminPage = (props: Props) => {

  return (
    <div className="flex min-h-screen bg-blue-700">
      <Sidebar />
      <div className="flex-1 p-6 shadow-[0_0_30px_-7px_#525d6b] m-3  bg-white">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage