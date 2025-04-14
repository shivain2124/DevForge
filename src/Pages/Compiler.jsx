// import React, { useState } from 'react';
// import MonacoCompiler from '../components/MonacoCompiler';

// const languageMap = {
//   cpp: 'cpp',
//   java: 'java',
//   python: 'python3',
//   c: 'c',
//   ruby: 'ruby',
//   go: 'go',
//   rust: 'rust',
//   kotlin: 'kotlin',
// };

// const Compiler = () => {
//   const [language, setLanguage] = useState('java');
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [theme, setTheme] = useState('vs-dark');

//   const PISTON_API_URL = 'https://emkc.org/api/v1/piston/execute';

//   const handleRunCode = async () => {
//     setIsLoading(true);
//     setOutput('');
//     setError('');

//     try {
//       const postResponse = await fetch(PISTON_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           language: languageMap[language],
//           source: code,
//           stdin: input,
//         }),
//       });

//       const result = await postResponse.json();
//       if (postResponse.ok) {
//         if (result && result.output) {
//           setOutput(result.output);
//         } else {
//           setError('No output or unexpected response');
//         }
//       } else {
//         setError(`Error: ${result.message || 'Unknown error occurred'}`);
//       }
//     } catch (err) {
//       setError('An error occurred while running the code');
//     } finally {
//       setIsLoading(false);
//     };
//   };
//     const handleThemeChange = (selectedTheme) => {
//       setTheme(selectedTheme);
//     };



//   return (
//     <div className="min-h-screen p-6 bg-[#1e1e1e] text-white font-mono">
//       <h1 className="text-4xl font-bold mb-6 text-center text-gray-300">DevForge Compiler</h1>

//       <div className="flex items-center mb-6">
//         <select
//           className="bg-[#2d2d2d] text-white px-4 py-2 rounded border border-gray-600 mr-4"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         >
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//           <option value="python">Python</option>
//           <option value="c">C</option>
//           <option value="rust">Rust</option>
//           <option value="go">Go</option>
//           <option value="ruby">Ruby</option>
//           <option value="kotlin">Kotlin</option>
//         </select>

//         <button
//           onClick={handleRunCode}
//           className="px-4 py-2 bg-[#0e639c] hover:bg-[#1177bb] rounded text-white"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Running...' : 'Run Code'}
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Monaco Editor */}
//         <div className="flex-1">
//           <h2 className="mb-2 font-semibold text-gray-400">Code</h2>
//           <MonacoCompiler
//             language={language}
//             code={code}
//             onCodeChange={setCode}
//           />
//         </div>

//             {/* <textarea  area
//                 rows={20}
//                 className="w-full p-4 rounded bg-gray-800 text-white font-mono"
//                 placeholder="// Write your code here"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//               ></textarea> */}

//         {/* Input + Output */}
//         <div className="flex flex-col w-full md:w-[40%]">
//           <div>
//             <h2 className="mb-2 font-semibold text-gray-400">Input</h2>
//             <textarea
//               rows={5}
//               className="w-full p-4 mb-4 rounded bg-[#1e1e1e] text-white border border-gray-700 resize-y"
//               placeholder="Custom input (if any)"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             ></textarea>
//           </div>

//           <div>
//             <h2 className="mb-2 mt-4 font-semibold text-gray-400">Output</h2>
//             <textarea
//               rows={10}
//               className={`w-full p-4 rounded border resize-y bg-[#1e1e1e] font-mono ${
//                 /error|exception|traceback/i.test(error || output)
//                   ? 'text-red-400 border-red-600'
//                   : 'text-green-400 border-green-600'
//               }`}
//               value={error || output}
//               readOnly
//             ></textarea>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Compiler;

import React, { useState } from 'react';
import MonacoCompiler from '../components/MonacoCompiler';

const languageMap = {
  cpp: 'cpp',
  java: 'java',
  python: 'python3',
  c: 'c',
  ruby: 'ruby',
  go: 'go',
  rust: 'rust',
  kotlin: 'kotlin',
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
          stdin: input,
        }),
      });

      const result = await postResponse.json();
      if (postResponse.ok) {
        if (result && result.output) {
          setOutput(result.output);
        } else {
          setError('No output or unexpected response');
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
    <div className="min-h-screen p-6 bg-[#1e1e1e] text-white font-mono">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-300">Code Compiler</h1>

      <div className="flex items-center mb-6">
        <select
          className="bg-[#2d2d2d] text-white px-4 py-2 rounded border border-gray-600 mr-4"
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

        <button
          onClick={handleRunCode}
          className="px-4 py-2 bg-[#0e639c] hover:bg-[#1177bb] rounded text-white"
          disabled={isLoading}
        >
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* Wrap the code, input, and output sections in a container */}
      <div className="flex flex-col md:flex-row gap-6 border-2 border-gray-700 rounded-lg p-4">
        {/* Monaco Editor */}
        <div className="flex-1">
          <h2 className="mb-2 font-semibold text-gray-400">Code</h2>
          <MonacoCompiler
            language={language}
            code={code}
            onCodeChange={setCode}
          />
        </div>

        {/* Input + Output */}
        <div className="flex flex-col w-full md:w-[40%] gap-4">
          {/* Input */}
          <div>
            <h2 className="mb-2 font-semibold text-gray-400">Input</h2>
            <textarea
              rows={5}
              className="w-full p-4 mb-4 rounded bg-[#1e1e1e] text-white border border-gray-700 resize-y"
              placeholder="Custom input (if any)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>

          {/* Output */}
          <div>
            <h2 className="mb-2 mt-4 font-semibold text-gray-400">Output</h2>
            <textarea
              rows={10}
              className={`w-full p-4 rounded border resize-y bg-[#1e1e1e] font-mono ${
                /error|exception|traceback/i.test(error || output)
                  ? 'text-red-400 border-red-600'
                  : 'text-green-400 border-green-600'
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
