import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureSection from '../components/FeatureSection';

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/auth');
  };

  return (
    //dot + blob
    <div className="bg-white relative isolate">
        {/* Dot pattern for texture */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.08]"></div>
        </div>
      
        {/* Top gradient blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3B82F6] to-[#6366F1] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
    


    {/* Hero Section - With Interactive Feature Showcase */}
<div className="px-6 pt-14 lg:px-8">
  <div className="max-w-6xl mx-auto pt-10 md:pt-20">
    <div className="flex flex-col items-center text-center">
      <h1 className="text-[clamp(3rem,10vw,5rem)] font-extrabold text-gray-900 leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          DevForge
        </span>
      </h1>
      <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl">
        Create, compile, and collaborate on code snippets with developers worldwide
      </p>
      
      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full max-w-md">
        <input
          type="email"
          placeholder="Email address"
          className="px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full flex-1 shadow-sm"
        />
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-base font-medium whitespace-nowrap transition-all duration-300 shadow-md"
        >
          Get Started
        </button>
      </div>
      
      {/* Interactive Feature Showcase */}
      <div className="mt-16 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Code Snippet Creation */}
        <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden col-span-1 lg:col-span-2 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
          <div className="flex items-center px-4 py-2 bg-gray-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-gray-400 text-xs">snippet.js</div>
          </div>
          <div className="p-4 font-mono text-sm text-left">
            <pre className="text-blue-400">function <span className="text-green-400">createSnippet</span><span className="text-white">(</span><span className="text-yellow-400">code</span><span className="text-white">) {'{'}</span></pre>
            <pre className="text-white ml-4">const snippet = {'{'}</pre>
            <pre className="text-white ml-8">id: generateId(),</pre>
            <pre className="text-white ml-8">code,</pre>
            <pre className="text-white ml-8">language: detectLanguage(code),</pre>
            <pre className="text-white ml-8">createdAt: new Date()</pre>
            <pre className="text-white ml-4">{'}'};</pre>
            <pre className="text-white ml-4">return saveToDatabase(snippet);</pre>
            <pre className="text-white">{'}'}</pre>
          </div>
        </div>

        {/* Collaboration Features */}
        <div className="flex flex-col gap-4">
          {/* Real-time Collaboration */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-indigo-600">Real-time Collaboration</h3>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="flex items-start gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
                <div className="flex-1 p-2 bg-blue-100 rounded-lg text-sm text-gray-800">
                  We should optimize this function for large datasets.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">SS</div>
                <div className="flex-1 p-2 bg-purple-100 rounded-lg text-sm text-gray-800">
                  Good idea! Let's add caching to improve performance.
                </div>
              </div>
            </div>
          </div>
          
          {/* Compilation Results */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-green-600">Instant Compilation</h3>
            </div>
            <div className="p-4 bg-gray-50 font-mono text-sm">
              <div className="text-green-600">
                {'>'} Running snippet.js<br />
                {'>'} Snippet created successfully<br />
                {'>'} ID: 8f7d3c2e-1a5b-4c9d-8e7f-6b5a4c3d2e1f
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


     {/* Bottom background blur effect - FIXED */}
<div
  aria-hidden="true"
  className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
>
  <div
    style={{
      clipPath:
        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
    }}
    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3B82F6] to-[#6366F1] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
  />
</div>

      {/* Feature Sections */}
      <div className="mt-20">
        <FeatureSection
          title="Store"
          description="DevForge allows you to easily upload and keep track of code snippets that are important to you. Create a post, upload the post, and never waste your time finding code snippets again."
          videoSrc="/videos/store-demo.mp4"
          reverse={false}
          bgColor="bg-white"
          textColor="text-gray-800"
          accentColor="text-indigo-600"
        />

        <FeatureSection
          title="Compile"
          description="DevForge offers a powerful code compiler that supports multiple programming languages. Compile your code snippets and see the results instantly."
          videoSrc="/videos/compile-demo.mp4"
          reverse={true}
          bgColor="bg-gray-50"
          textColor="text-gray-800"
          accentColor="text-indigo-600"
        />

        <FeatureSection
          title="Edit"
          description="DevForge provides a built-in code editor that allows you to edit your code snippets directly within the platform. No need to switch between different applications."
          videoSrc="/videos/edit-demo.mp4"
          reverse={false}
          bgColor="bg-white"
          textColor="text-gray-800"
          accentColor="text-indigo-600"
        />
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-600 pb-8">
        © 2025 DevForge. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;