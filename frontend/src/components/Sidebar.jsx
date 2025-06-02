import React, { useState } from "react";
import { FiFolder, FiCode, FiStar, FiMenu, FiX } from "react-icons/fi";

const Sidebar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-30 p-2 bg-gray-800 rounded-full text-white"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static top-0 left-0 z-20 h-full bg-gray-900 border-r border-gray-700 
        w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto pt-20 md:pt-4 px-4
      `}>
        <h2 className="text-xl font-bold text-white mb-6">Snippets</h2>

        {/* Main filters */}
        <ul className="space-y-1 mb-6">
          <li>
            <button 
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeFilter === "all" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleFilterClick("all")}
            >
              <FiCode size={18} />
              <span>All Snippets</span>
            </button>
          </li>
          <li>
            <button 
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeFilter === "favorites" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleFilterClick("favorites")}
            >
              <FiStar size={18} />
              <span>Favorites</span>
            </button>
          </li>
<li>
  <button 
    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
      activeFilter === "public" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`}
    onClick={() => handleFilterClick("public")}
  >
    <FiGlobe size={18} />
    <span>Public</span>
  </button>
</li>
<li>
  <button 
    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
      activeFilter === "private" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
    }`}
    onClick={() => handleFilterClick("private")}
  >
    <FiLock size={18} />
    <span>Private</span>
  </button>
</li>

          <li>
            <button 
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeFilter === "javascript" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleFilterClick("javascript")}
            >
              <FiFolder size={18} />
              <span>JavaScript</span>
            </button>
          </li>
          <li>
            <button 
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeFilter === "react" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleFilterClick("react")}
            >
              <FiFolder size={18} />
              <span>React</span>
            </button>
          </li>
        </ul>

        {/* Tags */}
        <div className="mb-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <button className="px-2 py-1 text-xs bg-blue-600/20 text-blue-400 rounded-full">
              #frontend
            </button>
            <button className="px-2 py-1 text-xs bg-green-600/20 text-green-400 rounded-full">
              #algorithm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
