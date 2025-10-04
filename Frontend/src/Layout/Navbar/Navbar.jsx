import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-white text-2xl font-extrabold tracking-wide cursor-pointer"
          >
            HelpDesk<span className="text-indigo-400">Mini</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-indigo-400 font-semibold transition"
            >
              Dashboard
            </Link>
            <Link
              to="/createticket"
              className="text-gray-300 hover:text-indigo-400 font-semibold transition"
            >
              Create Ticket
            </Link>
        

            {token ? (
              <div
                className="relative"
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <button className="flex items-center space-x-2 text-gray-300 hover:text-indigo-400 transition">
                  <CiUser size={26} className="text-white" />
                </button>

                {/* Dropdown */}
                {dropdown && (
                  <div className="absolute right-0 mt-3 w-40 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 transition"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-500 transition"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1 border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-md font-semibold transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

         
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-indigo-400 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/dashboard"
            className="block text-gray-300 hover:text-indigo-400 font-semibold px-2 py-1 rounded transition"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/createticket"
            className="block text-gray-300 hover:text-indigo-400 font-semibold px-2 py-1 rounded transition"
            onClick={() => setIsOpen(false)}
          >
            Create Ticket
          </Link>


          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md font-semibold transition duration-300 cursor-pointer mt-2"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="block w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md font-semibold transition duration-300 cursor-pointer mt-2"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
