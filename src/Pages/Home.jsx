import React from 'react'
import { useNavigate } from 'react-router-dom'
import FeatureSection from '../components/FeatureSection';

const Home = () => {
  const navigate=useNavigate();

  const handleRedirect=()=>{
    navigate('/auth');
  }

  return (
    <div className="bg-gray-900 text-white  py-20  min-h-screen ">
      {/* Flex row for content */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-x-16">
        
        {/* Left content */}
        <div className='flex flex-col gap-1.5 max-w-xl md:max-w-3xl px-4 sm:px-10 mb-10 w-full'>
          <div className="text-center md:text-left">
            <p className="m-0 text-[clamp(2.5rem,8.5vw,4rem)] font-medium text-blue-300 leading-tight">Welcome To</p>
            <h1 className="m-0 text-[clamp(3rem,12vw,5rem)] font-extrabold text-blue-500 leading-[0.7]">DevForge</h1>
            <p className="mt-9 text-[clamp(0.85rem,2.5vw,1rem)] text-gray-300  ">Store, compile, and edit code snippets with other developers on DevForge</p>
          </div>
          

        <div className='flex flex-col sm:flex-row gap-3 mt-4 w-full'>
          <input 
            type="email" 
            placeholder='Email address' 
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none w-full sm:w-auto flex-1"
          />
          <button 
            onClick={handleRedirect} 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm sm:text-base"
          >
            Sign Up
          </button>
        </div>
      </div>


       {/* Right logo */}
        <div className='hidden sm:block px-6 sm:px-10'>
          <img 
            src="/logo.png" 
            alt="DevForge Logo"
            className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto"
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
