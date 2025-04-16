import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Make sure to create this CSS file for the styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 p-4 px-6 text-white border-b border-white/10 md:px-10 lg:px-16 bg-gray-900 flex items-center justify-between">

      {/* Logo */}
      <h1 className="text-2xl font-bold">DevForge</h1>

      {/* Hamburger Menu - Only for Mobile */}
      <div className="md:hidden">
        <input
          type="checkbox"
          id="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
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
        } flex-col items-center gap-4 absolute top-16 right-4 bg-gray-800 p-4 rounded-lg md:static md:flex md:flex-row md:gap-10 md:bg-transparent md:p-0 md:rounded-none`}
      >
        <Link to="/" className="hover:text-yellow-300">
          Home
        </Link>
        <Link to="/auth" className="hover:text-yellow-300">
          Login / Sign Up
        </Link>
        <Link to="/compiler" className="hover:text-yellow-300">
          Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
