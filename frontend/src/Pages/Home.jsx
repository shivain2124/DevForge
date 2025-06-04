import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create');

  return (
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

      {/* Hero Section */}
      <div className="px-6 pt-14 lg:px-8">
        <div className="max-w-6xl mx-auto pt-10 md:pt-20">
          <div className="text-center mb-16">
            <h1 className="text-[clamp(3rem,10vw,5rem)] font-extrabold text-gray-900 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                DevForge
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Forge your coding future—create, compile, and collaborate.
            </p>
            {/* You can add a cute "Log in" button here if desired */}
          </div>

          {/* Feature Tabs */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium transition-all duration-200 ${
                    activeTab === 'create'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('create')}
                >
                  Create & Store
                </button>
                <button
                  className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium transition-all duration-200 ${
                    activeTab === 'compile'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('compile')}
                >
                  Compile & Run
                </button>
                <button
                  className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium transition-all duration-200 ${
                    activeTab === 'collaborate'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('collaborate')}
                >
                  Collaborate
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 min-h-[17rem] transition-all duration-300">
              {activeTab === 'create' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Create & Store Code Snippets
                    </h2>
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
              )}

              {activeTab === 'compile' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Compile & Run Instantly
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Write, compile, and execute code in your favorite languages right from your browser. Get instant feedback and see results in real time.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-gray-700">One-click code execution</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                        </svg>
                        <span className="text-gray-700">Live output and error logs</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8" />
                        </svg>
                        <span className="text-gray-700">Supports multiple languages</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex items-center px-4 py-2 bg-gray-800">
                      <span className="text-blue-400 font-bold text-xs mr-2">▶</span>
                      <span className="text-gray-400 text-xs">main.cpp</span>
                    </div>
                    <div className="p-4 font-mono text-sm text-left">
                      <pre className="text-blue-300">#include &lt;iostream&gt;</pre>
                      <pre className="text-white">using namespace std;</pre>
                      <pre className="text-white">int main() {'{'}</pre>
                      <pre className="text-green-400 ml-4">cout &lt;&lt; "Hello, World!" &lt;&lt; endl;</pre>
                      <pre className="text-white ml-4">return 0;</pre>
                      <pre className="text-white">{'}'}</pre>
                    </div>
                    <div className="bg-black p-2 text-green-400 text-xs font-mono border-t border-gray-800">
                      Output: Hello, World!
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'collaborate' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Collaborate in Real Time
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Work together with friends and teammates. Share code, chat, and co-edit in real time—just like Google Docs for code!
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-6.13a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-gray-700">Live co-editing sessions</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8" />
                        </svg>
                        <span className="text-gray-700">Integrated chat and messaging</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8" />
                        </svg>
                        <span className="text-gray-700">Shareable links for instant access</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="flex items-center px-4 py-2 bg-gray-800">
                      <span className="text-purple-400 font-bold text-xs mr-2">👥</span>
                      <span className="text-gray-400 text-xs">collab.js</span>
                    </div>
                    <div className="p-4 font-mono text-sm text-left">
                      <pre className="text-green-400">// User1:</pre>
                      <pre className="text-blue-400">function <span className="text-white">greet(name) {'{'}</span></pre>
                      <pre className="text-white ml-4">return `Hello, $&#123;name&#125;!`;</pre>
                      <pre className="text-white">{'}'}</pre>
                      <pre className="text-green-400 mt-2">// User2:</pre>
                      <pre className="text-blue-400">console.<span className="text-white">log(greet('World'));</span></pre>
                    </div>
                    <div className="bg-black p-2 text-purple-300 text-xs font-mono border-t border-gray-800 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8" />
                      </svg>
                      <span>Live: Editing by Alice & Bob</span>
                    </div>
                  </div>
                </div>
              )}
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

      {/* Bottom background blur effect */}
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
      {/* Footer */}
      <footer className="mt-10 text-center text-sm text-gray-600 pb-8">
        © 2025 DevForge. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
