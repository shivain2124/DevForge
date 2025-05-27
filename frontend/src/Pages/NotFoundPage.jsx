import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen md:overflow-hidden">
      {/* Left side - Text content */}
      <div className="flex flex-col justify-start items-start p-10 md:pt-40 bg-white">
        <h3 className="text-xl font-medium text-indigo-600">404</h3>
        <h1 className="text-6xl font-bold text-gray-800 mt-5 mb-8">Page Not Found</h1>
        <p className="text-2xl text-gray-500 text-pretty">Sorry, we couldn't find the page you're looking for</p>
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 font-medium mt-8 hover:underline">
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Right side - Image */}
      <div className="w-full h-full">
        <img src="/desert2.jpg" alt="Wrong Destination" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}

export default NotFoundPage
