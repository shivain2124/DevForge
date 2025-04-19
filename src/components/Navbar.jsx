import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-10 p-4 px-6 text-white border-b border-white/10 md:px-10 lg:px-16 bg-gray-900">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between relative">

        {/* Flex container with 3 sections */}
        <div className="w-full flex items-center justify-between">

          {/* Left: Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 z-20">
            <img 
              src="/logo1.png" 
              alt="logo" 
              className="h-6 w-6 object-cover scale-125 -ml-2" 
            />
            <h1 className="text-2xl font-bold">DevForge</h1>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden md:flex justify-center flex-1 px-4 z-10">
            <input
              type="text"
              placeholder="Search snippets..."
              className="w-full max-w-md px-4 py-2 text-sm rounded-full bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right: Nav + Menu */}
          <div className="flex items-center gap-4 z-20">

            {/* Hamburger */}
            <div className="md:hidden relative flex items-center">
              <input
                type="checkbox"
                id="checkbox"
                checked={isOpen}
                onChange={() => setIsOpen(!isOpen)}
                className="absolute opacity-0 w-0 h-0"
              />
              <label htmlFor="checkbox" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
              </label>
            </div>

            {/* Nav Links */}
            <div
              className={`${
                isOpen ? 'flex' : 'hidden'
              } flex-col items-center gap-4 absolute top-16 right-4 md:static md:flex md:flex-row md:gap-10 md:bg-transparent`}
            >
              <ul className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-xl gap-2 w-52 flex flex-col items-center md:flex-row md:bg-transparent md:shadow-none md:p-0 md:gap-0 md:w-auto">
                
                <li className="w-full">
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-4 px-4 py-2 w-full rounded-full hover:bg-purple-100 hover:text-black text-white transition-all ease-linear"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span className="text-sm font-semibold">Home</span>
                  </Link>
                </li>

                <li className="w-full">
                  <Link
                    to="/compiler"
                    onClick={closeMenu}
                    className="flex items-center gap-4 px-4 py-2 w-full rounded-full hover:bg-purple-100 hover:text-black text-white transition-all ease-linear"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span className="text-sm font-semibold">Code</span>
                  </Link>
                </li>

                <li className="w-full">
                  <Link
                    to="/snippets"
                    onClick={closeMenu}
                    className="flex items-center gap-4 px-4 py-2 w-full rounded-full hover:bg-purple-100 hover:text-black text-white transition-all ease-linear"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                    <span className="text-sm font-semibold">Snippets</span>
                  </Link>
                </li>

              </ul>
            </div>

            {/* Profile Section */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-expanded={profileDropdown}
              >
                SS
              </button>
              
              {/* Profile Dropdown */}
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-sm text-white">Signed in as</p>
                      <p className="text-sm font-medium truncate text-blue-300">user@example.com</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setProfileDropdown(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setProfileDropdown(false)}
                    >
                      Settings
                    </Link>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => {
                        // Handle logout logic here
                        setProfileDropdown(false);
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
