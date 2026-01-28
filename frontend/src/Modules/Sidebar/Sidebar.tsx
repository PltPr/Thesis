import { useAuth } from 'Context/useAuth';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();
  const {isAdmin,isExaminer}=useAuth();
  // Funkcja do ustalania klasy aktywnego linku
  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-lg font-semibold uppercase transition-colors ${
      location.pathname.includes(path)
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'
    }`

  return (
    <nav className="w-64 bg-white shadow-xl h-screen flex flex-col px-6 py-6 mt-6 rounded-2xl border border-blue-200">
      <div className="flex justify-center mb-10 border-b border-blue-200 pb-4">
        <h1 className="text-2xl font-extrabold text-blue-700">{isAdmin() ? "Admin Panel" : "Examiner Panel"}</h1>
      </div>

      <div className="flex flex-col flex-1 space-y-3">
        <Link to="application-page" className={linkClass('application-page')}>
          Applications
        </Link>
        <Link to="classification-page" className={linkClass('classification-page')}>
          Classification
        </Link>
        <Link to="creator-page" className={linkClass('creator-page')}>
          Tests
        </Link>
        {isAdmin()&&(
          <>
          <Link to="users-management-page" className={linkClass('users-management-page')}>
          Users
        </Link>
        <Link to="job-offer-management-page" className={linkClass('job-offer-management-page')}>
          Job Offers
        </Link>
          </>
          
        )}
        
      </div>
    </nav>
  )
}

export default Sidebar
