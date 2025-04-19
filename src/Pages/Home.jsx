import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureSection from '../components/FeatureSection';

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/auth');
  };

  return (
    <div className="bg-gray-900 text-white py-10 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 gap-10 md:gap-16">
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <div className="text-center md:text-left">
            <p className="m-0 text-[clamp(2.5rem,7vw,3.2rem)] font-medium text-white leading-none whitespace-nowrap">
              Welcome To
            </p>
            <h1 className="m-0 text-[clamp(3rem,10vw,5rem)] font-extrabold text-white leading-normal">
              DevForge
            </h1>
            <p className="mt-4 text-[clamp(0.85rem,2.5vw,1rem)] text-gray-300">
              Store, compile, and edit code snippets with other developers on DevForge.
            </p>
          </div>

          {/* Input and Button */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] w-full sm:w-auto flex-1"
            />
            <button
              onClick={handleRedirect}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] hover:bg-gradient-to-r hover:from-[#2563EB] hover:to-[#4F46E5] text-white rounded text-sm sm:text-base whitespace-nowrap transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/logo1.png"
            alt="DevForge Logo"
            className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] object-contain"
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="mt-8 border-[#374151] w-3/4 md:w-1/2 mx-auto my-8" />

      {/* Feature Sections */}
      <FeatureSection
        title="Store"
        description="DevForge allows you to easily upload and keep track of code snippets that are important to you. Create a post, upload the post, and never waste your time finding code snippets again."
        videoSrc="/videos/store-demo.mp4"
        reverse={false}
        bgColor="bg-gray-900"
      />

      {/* Horizontal Line */}
      <hr className="mt-8 border-[#374151] w-3/4 md:w-1/2 mx-auto my-8" />

      <FeatureSection
        title="Compile"
        description="DevForge offers a powerful code compiler that supports multiple programming languages. Compile your code snippets and see the results instantly."
        videoSrc="/videos/compile-demo.mp4"
        reverse={true}
        bgColor="bg-gray-900"
      />

      {/* Horizontal Line */}
      <hr className="mt-8 border-[#374151] w-3/4 md:w-1/2 mx-auto my-8" />

      <FeatureSection
        title="Edit"
        description="DevForge provides a built-in code editor that allows you to edit your code snippets directly within the platform. No need to switch between different applications."
        videoSrc="/videos/edit-demo.mp4"
        reverse={false}
        bgColor="bg-gray-900"
      />

      {/* Horizontal Line */}
      <hr className="mt-8 border-[#374151] w-3/4 md:w-1/2 mx-auto my-8" />

      {/* Footer */}
      <footer className="mt-10 text-center text-sm">
        © 2025 DevForge. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;