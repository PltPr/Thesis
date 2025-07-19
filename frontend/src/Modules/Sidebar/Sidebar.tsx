import React from 'react'
import { Link } from 'react-router-dom'


interface Props {}

const Sidebar = () => {
  return (
    <nav className="w-64 bg-white shadow-xl h-screen flex flex-col px-6 py-4  mt-3 border border-red-700 ">
        <div className='flex justify-center '>
        <h1 className='mb-10 font-bold text-red-700 border-b'>Admin Page</h1>
        </div>
      <div className="flex flex-col flex-1 space-y-4">
        
        <Link
          to="application-page"
          className="text-blueGray-700 font-semibold uppercase"
        >
          Applications
        </Link>
        <Link
          to="classification-page"
          className="text-blueGray-700 font-semibold uppercase"
        >
          Classification
        </Link>
        <Link
          to="creator-page"
          className="text-blueGray-700 font-semibold uppercase"
        >
          Tests
        </Link>
      </div>
    </nav>
  )
}


export default Sidebar