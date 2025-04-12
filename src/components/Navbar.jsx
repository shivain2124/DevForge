import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white p-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>DevForge</h1>
        <div className='flex gap-4'>
            <Link to="/" className='hover:text-yellow-400'>Home</Link>
            <Link to="/auth" className='hover:text-yellow-300'>Login/ Sign Up</Link>
            <Link to="/snippets" className='hover:text-yellow-300'>Snippets</Link>
        </div>
        
    </nav>
  )
}

export default Navbar