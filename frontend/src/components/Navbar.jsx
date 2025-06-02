import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <div className="bg-white pt-2">
      <header className="sticky top-0 z-50 shadow-sm">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img 
                src="/logo1.png" 
                alt="DevForge" 
                className="h-8 w-auto" 
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                DevForge
              </span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <FiMenu className="size-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/" className="text-sm/6 font-semibold text-gray-900 hover: text-blue-600 transition-colours duration-200">
              Home
            </Link>
            <Link to="/compiler" className="text-sm/6 font-semibold text-gray-900 ">
              Code
            </Link>
            <Link to="/explore" className="text-sm/6 font-semibold text-gray-900 hover:text-blue-600 transition-colours duration-200">
             Explore
            </Link>
            <Link to="/snippets" className="text-sm/6 font-semibold text-gray-900 ">
              Snippets
            </Link>
          </div>
          
          {/* Profile/Login section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button 
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center gap-2 text-sm/6 font-semibold text-gray-900"
            >
              <span>Account</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                SS
              </div>
            </button>
            
            {/* Profile Dropdown */}
            {profileDropdown && (
              <div className="absolute right-8 top-16 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium truncate text-blue-600">user@example.com</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileDropdown(false)}
                  >
                    Your Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setProfileDropdown(false)}
                  >
                    Settings
                  </Link>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
        </nav>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <img 
                    src="/logo1.png" 
                    alt="DevForge" 
                    className="h-8 w-auto" 
                  />
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    DevForge
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <FiX className="size-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      to="/"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to="/compiler"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Code
                    </Link>
                    <Link
                    to="/explore"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Explore
                  </Link>
                    <Link
                      to="/snippets"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Snippets
                    </Link>
                  </div>
                  <div className="py-6">
                    <Link
                      to="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 w-full text-left"
                      onClick={() => {
                        // Handle logout logic here
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
