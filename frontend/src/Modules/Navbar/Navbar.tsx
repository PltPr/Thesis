import { useAuth } from 'Context/useAuth';
import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const Navbar = (props: Props) => {
  const {isLoggedIn,logout}=useAuth();
  return (
    <nav className="flex justify-between items-center bg-white px-[30px] py-[15px] h-[60px] text-black shadow-[0px_4px_5px_rgba(0,0,0,0.5)]">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="inline-block w-auto mr-auto">
          <img
            src="/itrack-logo2.svg"
            alt="Logo"
            className="block w-auto h-[60px]"
          />
        </Link>
      </div>

      {/* Menu */}
      <ul className="list-none flex gap-[20px]">
        

    {isLoggedIn()?(
      <>

       <li className="inline">
          <Link
            to="/my-application-page"
            className="no-underline cursor-pointer"
          >
            user-application
          </Link>
        </li>

       <li className="inline">
          <Link
            to="/admin-page"
            className="no-underline cursor-pointer"
          >
            admin
          </Link>
        </li>




        <li onClick={logout} className="inline no-underline text-red-500 text-[18px] hover:text-[#6f00ff] cursor-pointer">
            Logout
        </li>

       
        </>
    ):(
      <>
      <li className="inline">
      <Link
        to="/login-page"
        className="no-underline text-black text-[18px] hover:text-[#6f00ff]"
      >
        Login
      </Link>
    </li>

    <li className="inline">
      <Link
        to="/register-page"
        className="no-underline text-black text-[18px] hover:text-[#6f00ff]"
      >
        Register
      </Link>
    </li>


    </>
  )}
      </ul>
    </nav>
  );
}

export default Navbar