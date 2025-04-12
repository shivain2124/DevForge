import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthChoice = () => {
    const navigate=useNavigate();

  return (
    <div className='flex flex-col items-center justify-center h-screen text-white bg-gray-800'>
       <h2 className='text-2xl font-semibold'>Welcome to DevForge</h2> 
       <p>Please choose an option:</p>
       <div className='flex gap-4'>
            <button
                onClick={()=>navigate('/login')}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'>
                    Login
            </button>
            <button
              onClick={()=>navigate('/signup')}
              className='bg-red-500 hover:bg-red-700 text-white fint-bold py-2 px-4 rounded m-2'>
                Sign Up
            </button>
       </div>
    </div>
  )
}

export default AuthChoice