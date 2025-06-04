import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function getInitials(nameOrEmail) {
    if (!nameOrEmail) return 'U';
    const [name] = nameOrEmail.split('@');
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="bg-white pt-2">
      <header className="sticky top-0 z-50 shadow-sm bg-white">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
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
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <FiMenu className="size-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            <Link to="/" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50">
              Home
            </Link>
            <Link to="/compiler" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50">
              Code
            </Link>
            <Link to="/explore" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50">
              Explore
            </Link>
            <Link to="/snippets" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50">
              Snippets
            </Link>
          </div>

          {/* Profile/Login section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span>{user.username || 'User'}</span>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(user.username || user.email || 'User')}
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="z-50 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 text-gray-900 shadow-xl shadow-black/[.08] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="end"
                    sideOffset={8}
                  >
                    {/* User Info Header */}
                    <DropdownMenu.Label className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {getInitials(user.username || user.email || 'User')}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-gray-900">
                            {user.username || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email || 'user@example.com'}
                          </p>
                        </div>
                      </div>
                    </DropdownMenu.Label>

                    {/* Menu Items */}
                    <DropdownMenu.Group>
                      <DropdownMenu.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-4 py-2 text-sm outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Link to="/profile" className="flex items-center w-full">
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Your Profile
                        </Link>
                      </DropdownMenu.Item>

                      <DropdownMenu.Item className="relative flex cursor-pointer select-none items-center rounded-sm px-4 py-2 text-sm outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <Link to="/settings" className="flex items-center w-full">
                          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>

                    <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-gray-200" />

                    <DropdownMenu.Item 
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-4 py-2 text-sm outline-none transition-colors hover:bg-red-50 focus:bg-red-50 text-red-600 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      onClick={handleLogout}
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-150 border border-blue-200"
              >
                Log in
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile menu - Keep your existing mobile menu code */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
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
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 mb-4 px-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            {getInitials(user.username || user.email || 'User')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.username || 'User'}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
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
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-red-600 hover:bg-red-50 w-full text-left"
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/auth"
                        className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition block text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign in
                      </Link>
                    )}
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
