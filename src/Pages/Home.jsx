import React from 'react'

const Home = () => {
  return (
    <div className="bg-gray-900 text-white px-6 sm:px-10 py-20">
      {/* Flex row for content */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-x-16">
        
        {/* Left content */}
        <div className='flex flex-col gap-4 max-w-xl'>
          <p className="text-4xl font-medium text-blue-300">Welcome to</p>
          <h1 className="text-6xl font-extrabold text-blue-500">DevForge</h1>
          <p className="text-lg text-gray-300">Store, Edit and Compile</p>

          <div className='flex gap-2 mt-4'>
            <input 
              type="email" 
              placeholder='Email address' 
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Sign Up/Login
            </button>
          </div>
        </div>

        {/* Right logo */}
        <div className='hidden md:block'>
          <img 
            src="/logo.png" 
            alt="DevForge Logo"
            className="w-[300px] md:w-[350px] lg:w-[400px]"
          />
        </div>

      </div>

      {/* Horizontal line after section */}
      <hr className="mt-16 border-gray-700 w-3/4 md:w-1/2 mx-auto" />

    </div>
  )
}

export default Home
