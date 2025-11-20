import { useAuth } from "Context/useAuth";
import { BookOpen, ShieldBan, SquarePen, MoreVertical, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="navbar flex justify-between items-center bg-white px-[50px] h-[30px] text-black">
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
            {/* --- Paski przed przyciskami --- */}
            <li className="flex flex-col gap-1 rotate-12 mr-10">
              <span className="block w-2 h-6 bg-blue-700"></span>
              <span className="block w-2 h-6 bg-blue-700"></span>
              <span className="block w-2 h-6 bg-blue-700"></span>
            </li>

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
            <li>
              <Link
                to="/admin-page"
                className="no-underline cursor-pointer flex gap-2 items-center text-red-500"
              >
                <ShieldBan />
                <span className="text-red-500">Admin</span>
              </Link>
            </li>

            {/* --- Paski po przyciskach --- */}
            <li className="flex flex-col gap-1 -rotate-12 ml-10">
              <span className="block w-2 h-6 bg-blue-700"></span>
              <span className="block w-2 h-6 bg-blue-700"></span>
              <span className="block w-2 h-6 bg-blue-700"></span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login-page" className="no-underline text-black">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register-page"
                className="no-underline text-black text-[18px]"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>


      {/* --- Menu trzy kropki po prawej (daisyUI) --- */}
      <div className="relative flex-none">
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-square btn-ghost">
            <MoreVertical className="w-6 h-6 stroke-2" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white border  border-gray-500 w-auto  text-center "
          >
            {isLoggedIn() ? (
              <div className="">
              <li>
                <button
                  className="text-black flex border-b"
                  onClick={() => logout()}
                >
                  <User />
                  <h1>Profile</h1>
                </button>
              </li>
              <li>
                <button
                  className="text-red-500 flex"
                  onClick={() => logout()}
                >
                  <LogOut />
                  <h1>Logout</h1>
                </button>
              </li>
              </div>
            ) : (
              <>
                <li>
                  <Link to="/login-page">Login</Link>
                </li>
                <li>
                  <Link to="/register-page">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
