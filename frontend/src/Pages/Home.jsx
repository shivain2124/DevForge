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
    

    {/* Hero Section - Multi-Feature Showcase */}
    <div className="px-6 pt-14 lg:px-8">
  <div className="max-w-6xl mx-auto pt-10 md:pt-20">
    <div className="text-center mb-16">
      <h1 className="text-[clamp(3rem,10vw,5rem)] font-extrabold text-gray-900 leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          DevForge
        </span>
      </h1>
      <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
        The complete platform for code snippet management and collaboration
      </p>
      
      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full max-w-md mx-auto">
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
    </div>
    
    {/* Feature Tabs */}
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button className="w-1/3 py-4 px-1 text-center border-b-2 border-indigo-500 font-medium text-indigo-600">
            Create & Store
          </button>
          <button className="w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Compile & Run
          </button>
          <button className="w-1/3 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Collaborate
          </button>
        </nav>
      </div>
      
      {/* Feature Content - Create & Store */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create & Store Code Snippets</h2>
            <p className="text-gray-600 mb-6">
              Save your most useful code snippets in one secure place. Organize with tags, search instantly, and access from anywhere.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Support for 8+ programming languages</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Powerful search and filtering</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Custom tags and organization</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center px-4 py-2 bg-gray-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-gray-400 text-xs">quicksort.py</div>
            </div>
            <div className="p-4 font-mono text-sm text-left">
              <pre className="text-green-400">def <span className="text-blue-400">quicksort</span><span className="text-white">(arr):</span></pre>
              <pre className="text-white ml-4">if len(arr) {'<='} 1:</pre>
              <pre className="text-white ml-8">return arr</pre>
              <pre className="text-white ml-4">pivot = arr[len(arr) // 2]</pre>
              <pre className="text-white ml-4">left = [x for x in arr if x {'<'} pivot]</pre>
              <pre className="text-white ml-4">middle = [x for x in arr if x == pivot]</pre>
              <pre className="text-white ml-4">right = [x for x in arr if x {'>'} pivot]</pre>
              <pre className="text-white ml-4">return quicksort(left) + middle + quicksort(right)</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {/* Collaboration Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div className="h-2 bg-purple-600"></div>
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Collaboration</h3>
          <p className="text-gray-600">
            Work together on code snippets with team members in real-time. See changes as they happen and discuss improvements.
          </p>
        </div>
      </div>
      
      {/* Compilation Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div className="h-2 bg-green-600"></div>
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Compilation</h3>
          <p className="text-gray-600">
            Compile and run your code directly in the browser. Test your snippets instantly without switching tools.
          </p>
        </div>
      </div>
      
      {/* Sharing Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div className="h-2 bg-blue-600"></div>
        <div className="p-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Sharing</h3>
          <p className="text-gray-600">
            Share your snippets with anyone via secure links. Control access and permissions for each snippet.
          </p>
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


      {/* Feature Section
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
      </div> */}

      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-600 pb-8">
        © 2025 DevForge. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;