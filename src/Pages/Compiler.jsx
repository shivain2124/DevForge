import React, { useState } from 'react';

const languageMap = {
  cpp: 'cpp', // C++ (GCC 9.2.0)
  java: 'java', // Java (OpenJDK 13.0.1)
  python: 'python3', // Python (3.8.1)
  c: 'c', // C (GCC 9.2.0)
  ruby: 'ruby', // Ruby (2.7.0)
  go: 'go', // Go (1.13.5)
  rust: 'rust', // Rust (1.40.0)
  kotlin: 'kotlin' // Kotlin (1.3.70)
};

const Compiler = () => {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const PISTON_API_URL = 'https://emkc.org/api/v1/piston/execute';

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');

    try {
      const postResponse = await fetch(PISTON_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: languageMap[language],
          source: code,
          stdin: input, // If there is any custom input
        }),
      });

      const result = await postResponse.json();
      if (postResponse.ok) {
        // Output handling
        if (result && result.output) {
          setOutput(result.output);
        } else {
          setError('No output or an unexpected response');
        }
      } else {
        setError(`Error: ${result.message || 'Unknown error occurred'}`);
      }
    } catch (err) {
      setError('An error occurred while running the code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-400">Code Compiler</h1>

      <div className="flex items-center mb-6">
        <div className="mr-4">
          <select
            className="bg-gray-800 px-4 py-2 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
            <option value="ruby">Ruby</option>
            <option value="kotlin">Kotlin</option>
          </select>
        </div>

        <button
          onClick={handleRunCode}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side (Code) */}
        <div className="flex-1">
          <h2 className="mb-2 font-semibold">Code</h2>
          <textarea
            rows={20}
            className="w-full p-4 rounded bg-gray-800 text-white font-mono"
            placeholder="// Write your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        {/* Right side (Input and Output) */}
        <div className="flex flex-col flex-none w-full md:w-[40%]">

          <div>
            <h2 className="mb-2 font-semibold">Input</h2>
            <textarea
              rows={5}
              className="w-full p-4 mb-4 rounded bg-gray-800 text-white font-mono"
              placeholder="Custom input (if any)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          
            {/* OUTPUT BLOCK */}
            <div >
            <h2 className="mb-2 mt-4 font-semibold">Output</h2>
            <textarea
                rows={10}
                className={`w-full p-4 mb-4 rounded bg-gray-800 font-mono ${
                /error|exception|traceback/i.test(error || output)
                    ? 'text-red-400'
                    : 'text-green-400'
                }`}
                value={error || output}
                readOnly
            ></textarea>
            </div>

          
        </div>
      </div>
    </div>
  );
};

export default Compiler;
