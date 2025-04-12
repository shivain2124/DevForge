import React from 'react'
import { useNavigate } from 'react-router-dom'
import WhatDevForgeCanDo from '../components/WhatDevForgeCanDo';
import FeatureSection from '../components/FeatureSection';

const Home = () => {
  const navigate=useNavigate();

  const handleRedirect=()=>{
    navigate('/auth');
  }

  return (
    <div className="bg-gray-900 text-white  py-20">
      {/* Flex row for content */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-x-16">
        
        {/* Left content */}
        <div className='flex flex-col gap-4 max-w-xl px-6 sm:px-10 mb-30'>
          <p className="text-4xl font-medium text-blue-300">Welcome to</p>
          <h1 className="text-6xl font-extrabold text-blue-500">DevForge</h1>
          <p className="text-lg text-gray-300">Store, Edit and Compile</p>

          <div className='flex gap-2 mt-4'>
            <input 
              type="email" 
              placeholder='Email address' 
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
            <button onClick={handleRedirect} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Sign Up/Login
            </button>
          </div>
        </div>

        {/* Right logo */}
        <div className='hidden md:block px-6 sm:px-10'>
          <img 
            src="/logo.png" 
            alt="DevForge Logo"
            className="w-[300px] md:w-[350px] lg:w-[400px]"
          />
        </div>

      </div>

      {/* Horizontal line after section */}
       <hr className="mt-16 border-gray-700 w-3/4 md:w-1/2 mx-auto mb-16" />



          
      <FeatureSection
      title="Store"
      description="DevForge allows you to easily upload and keep track of code snippets that are important to you. Create a post, upload the post, and never waste your time finding code snippets again."
      videoSrc="/videos/store-demo.mp4"
      reverse={false}
      bgColor="bg-gray-900"
      />

      {/* Horizontal line after section */}
      <hr className="mt-16 border-gray-700 w-3/4 md:w-1/2 mx-auto" />

      <FeatureSection
      title="Compile"
      description="DevForge offers a powerful code compiler that supports multiple programming languages. Compile your code snippets and see the results instantly."
      videoSrc="/videos/compile-demo.mp4"
      reverse={true}
      bgColor="bg-gray-900"
      />

      {/* Horizontal line after section */}
      <hr className="mt-16 border-gray-700 w-3/4 md:w-1/2 mx-auto mb-16" />

      <FeatureSection
      title="Edit"
      description="DevForge provides a built-in code editor that allows you to edit your code snippets directly within the platform. No need to switch between different applications." 
      videoSrc="/videos/edit-demo.mp4"
      reverse={false}
      bgColor="bg-gray-900"
      />





        {/* Horizontal line after section */}
      <hr className="mt-16 border-gray-700 w-3/4 md:w-1/2 mx-auto" />


        <footer className="mt-24 text-center text-gray-500 text-sm">
           © 2025 DevForge. All rights reserved.
        </footer>


    </div>

    
  )
}

export default Home
