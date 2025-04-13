import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
  return (


    <nav className='sticky top-0 z-10 bg-gray-900 text-white p-4 px-6  border-b border-white/10 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between'>
        {/* logo */}
        <h1 className='text-2xl font-bold mb-2 md:mb-0 md:mr-10'>DevForge</h1>

        <div className='flex gap-15 justify-center flex-grow'>
            <Link to="/" className='hover:text-yellow-300'>Home</Link>
            <Link to="/auth" className='hover:text-yellow-300'>Login/ Sign Up</Link>
            <Link to="/compiler" className='hover:text-yellow-300'>Code</Link>
        </div>
        
    </nav>

  )
};
export default Navbar;