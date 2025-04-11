import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white p-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>DevForge</h1>
        <Link to="/" className='hover:text-yellow-400'>Home</Link>
        <Link to="/login" className='hover:text-yellow-300'>Login</Link>
        <Link to="/signup" className='hover:text-yellow-300'>Sign Up</Link>
        <Link to="/snippets" className='hover:text-yellow-300'>Snippets</Link>
        
    </nav>
  )
}

export default Navbar