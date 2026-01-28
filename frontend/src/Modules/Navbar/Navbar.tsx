import { useAuth } from "Context/useAuth";
import { BookOpen, ShieldBan, SquarePen, MoreVertical, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  const { isLoggedIn, logout,isAdmin,isExaminer } = useAuth();

  return (
    <div className="navbar flex justify-between items-center bg-white px-[50px] h-[30px] text-black border-b-2">
      {/* --- Logo po lewej --- */}
      <div className="flex items-center flex-shrink-0">
        <Link to="/" className="inline-block">
          <img
            src="/itrack-logo2.svg"
            alt="Logo"
            className="block w-auto h-[50px]"
          />
        </Link>
      </div>


      {/* --- Menu w środku --- */}
      <ul className="list-none flex gap-[20px] items-center justify-center flex-1">
        {isLoggedIn() ? (
          <>


            {/* --- Środkowe przyciski --- */}
            <li>
              <Link
                to="/job-offer-page"
                className="no-underline cursor-pointer flex gap-2 items-center"
              >
                <SquarePen />
                <span>Job Offers</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-application-page"
                className="no-underline cursor-pointer flex gap-2 items-center"
              >
                <BookOpen />
                <span>My Applications</span>
              </Link>
            </li>
            {(isAdmin() || isExaminer()) &&(
              <li>
              <Link
                to="/admin-page"
                className="no-underline cursor-pointer flex gap-2 items-center text-red-500"
              >
                <ShieldBan />
                <span className="text-red-500">{isAdmin() ? "Admin" : "Examiner"}</span>
              </Link>
            </li> 
            )}
             


          </>
        ) : (
          <>
           <li>
              <Link
                to="/job-offer-page"
                className="no-underline cursor-pointer flex gap-2 items-center"
              >
                <SquarePen />
                <span>Job Offers</span>
              </Link>
            </li>
          </>
        )}
      </ul>


      {/* --- Menu trzy kropki po prawej (daisyUI) --- */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
            </button>
          </div>
        </div>
        <ul
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {isLoggedIn() ?
            (
              <>
                <Link to='user-page'>
                  <li>
                    <a >
                      Profile
                    </a>
                  </li>
                </Link>
                <button onClick={logout}>
                  <li>
                    <a>Logout</a>
                  </li>
                </button>
              </>
            ) : (
              <>
              <Link to="login-page">
                <li>
                  <a >
                    Login
                  </a>
                </li>
              </Link>
              
              <Link to="register-page">
                <li>
                  <a>
                    Register
                  </a>
                </li>
              </Link>

              </>
            )}

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
