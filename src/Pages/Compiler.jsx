// import React, { useState } from 'react';
// import AceEditor from "react-ace";
// import CodeEditor from '../components/CodeEditor';


// //language map 
// const languageMap = {
//   cpp: 'cpp', // C++ (GCC 9.2.0)
//   java: 'java', // Java (OpenJDK 13.0.1)
//   python: 'python3', // Python (3.8.1)
//   c: 'c', // C (GCC 9.2.0)
//   ruby: 'ruby', // Ruby (2.7.0)
//   go: 'go', // Go (1.13.5)
//   rust: 'rust', // Rust (1.40.0)
//   kotlin: 'kotlin' // Kotlin (1.3.70)
// };

// // Map language to Ace editor mode
// const langToMode = {
//   cpp: "c_cpp",
//   java: "java",
//   python: "python",
//   c: "c_cpp",
//   ruby: "ruby",
//   go: "golang",
//   rust: "rust",
//   kotlin: "kotlin"
// };

// const Compiler = () => {
//   const [language, setLanguage] = useState('java');
//   const [code, setCode] = useState('');
//   const [input, setInput] = useState('');
//   const [output, setOutput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   //piston api url
//   const PISTON_API_URL = 'https://emkc.org/api/v1/piston/execute';

//   // code running function
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
//           stdin: input, // If there is any custom input
//         }),
//       });

//       const result = await postResponse.json();
//       if (postResponse.ok) {
//         // Output handling
//         if (result && result.output) {
//           setOutput(result.output);
//         } else {
//           setError('No output or an unexpected response');
//         }
//       } else {
//         setError(`Error: ${result.message || 'Unknown error occurred'}`);
//       }
//     } catch (err) {
//       setError('An error occurred while running the code');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-900 text-white">
//       <h1 className="text-4xl font-bold mb-6 text-center text-gray-400">Code Compiler</h1>
  
//       <div className="flex items-center mb-6">
//   <div className="mr-4">
//     <select
//       className="bg-gray-800 px-4 py-2 rounded"
//       value={language}
//       onChange={(e) => setLanguage(e.target.value)}
//     >
//       <option value="cpp">C++</option>
//       <option value="java">Java</option>
//       <option value="python">Python</option>
//       <option value="c">C</option>
//       <option value="rust">Rust</option>
//       <option value="go">Go</option>
//       <option value="ruby">Ruby</option>
//       <option value="kotlin">Kotlin</option>
//     </select>
//   </div>

//       <div className="flex items-center space-x-4">
//         <button
//           onClick={handleRunCode}
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Running...' : 'Run Code'}
//         </button>

//         <button
//           // onClick={handleSaveCode}
//           className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
//         >
//           Save
//         </button>
//       </div>
//     </div>

  
//       {/* === OUTER WRAPPER with border === */}
//       <div className="border border-gray-700 rounded-lg p-4">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Code Block */}
//           <div className="flex-1">
//             <h2 className="mb-2 font-semibold">Code</h2>
//             {/* Replace textarea with AceEditor */}
//             <div className="rounded overflow-hidden">
//             <CodeEditor
//               mode={langToMode[language] || "java"}
//               theme="cobalt"
//               value={code}
//               onChange={setCode}
//             />    
//             </div>
//           </div>
  
//           {/* Input & Output Block */}
//           <div className="flex flex-col flex-none w-full md:w-[40%]">
//             <div>
//               <h2 className="mb-2 font-semibold">Input</h2>
//               <textarea
//                 rows={5}
//                 className="w-full p-4 mb-4 rounded bg-gray-800 text-white font-mono"
//                 placeholder="Custom input (if any)"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//               ></textarea>
//             </div>
  
//             <div>
//               <h2 className="mb-2 mt-4 font-semibold">Output</h2>
//               <textarea
//                 rows={10}
//                 className={`w-full p-4 mb-4 rounded bg-gray-800 font-mono ${
//                   /error|exception|traceback/i.test(error || output)
//                     ? 'text-red-400'
//                     : 'text-green-400'
//                 }`}
//                 value={error || output}
//                 readOnly
//               ></textarea>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Compiler;


import React, { useState, useCallback } from 'react';
import CodeEditor from '../components/CodeEditor';
import TagsInput from '../components/TagsInput';
import { useEffect } from 'react';


// Language maps and constants remain the same
const languageMap = {
  cpp: 'cpp',
  java: 'java',
  python: 'python3',
  c: 'c',
  ruby: 'ruby',
  go: 'go',
  rust: 'rust',
  kotlin: 'kotlin'
};

const langToMode = {
  cpp: "c_cpp",
  java: "java",
  python: "python",
  c: "c_cpp",
  ruby: "ruby",
  go: "golang",
  rust: "rust",
  kotlin: "kotlin"
};

const languageTags = {
  cpp: ["algorithm", "data-structure", "stl", "oop"],
  java: ["spring", "android", "collections", "oop"],
  python: ["django", "flask", "pandas", "numpy"],
  c: ["pointers", "memory", "algorithms", "structures"],
  ruby: ["rails", "gems", "blocks"],
  go: ["goroutines", "channels", "concurrency"],
  rust: ["ownership", "borrowing", "traits", "lifetime"],
  kotlin: ["android", "coroutines", "functional"]
};

const Compiler = () => {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');

  // Piston API URL
  const PISTON_API_URL = 'https://emkc.org/api/v1/piston/execute';

  // Tag handlers with useCallback
  const handleAddTag = useCallback((newTag) => {
    setTags(prevTags => [...prevTags, newTag]);
  }, []);

  const handleRemoveTag = useCallback((tagToRemove) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  }, []);

  // Run code handler with useCallback
  const handleRunCode = useCallback(async () => {
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
  }, [language, code, input]);

  // Save code handler with useCallback
  const handleSaveCode = useCallback(() => {
    const codeSnippet = {
      title: title || "Untitled Snippet",
      language,
      code,
      tags,
      input,
      createdAt: new Date().toISOString()
    };

    console.log("Saving code snippet:", codeSnippet);
    alert("Code snippet saved successfully!");
  }, [title, language, code, tags, input]);

  // Language change handler with useCallback
  const handleLanguageChange = useCallback((e) => {
    setLanguage(e.target.value);
  }, []);

  // Title change handler with useCallback
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  // Input change handler with useCallback
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  // Code change handler
  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-400">Code Compiler</h1>
      
      {/* Title input */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter snippet title"
          className=" w-full sm:w-[304px] p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
      </div>
  
      {/* Tags Input Component */}
      <TagsInput 
        tags={tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        suggestedTags={languageTags[language] || []}
      />

<div className="mt-6 flex items-center mb-6">
        <div className="mr-4">
          <select
            className="bg-gray-800 px-4 py-2 rounded"
            value={language}
            onChange={handleLanguageChange}
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

        <div className="flex items-center space-x-4">
          <button
            onClick={handleRunCode}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </button>

          <button
            onClick={handleSaveCode}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Save
          </button>
        </div>
      </div>
  
      {/* === OUTER WRAPPER with border === */}
      <div className="border border-gray-700 rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Code Block */}
          <div className="flex-1">
            <h2 className="mb-2 font-semibold">Code</h2>
            <div className="rounded overflow-hidden">
              <CodeEditor
                mode={langToMode[language] || "java"}
                theme="cobalt"
                value={code}
                onChange={handleCodeChange}
              />    
            </div>
          </div>
  
          {/* Input & Output Block */}
          <div className="flex flex-col flex-none w-full md:w-[40%]">
            <div>
              <h2 className="mb-2 font-semibold">Input</h2>
              <textarea
                rows={5}
                className="w-full p-4 mb-4 rounded bg-gray-800 text-white font-mono"
                placeholder="Custom input (if any)"
                value={input}
                onChange={handleInputChange}
              ></textarea>
            </div>
  
            <div>
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
    </div>
  );
};

export default Compiler;
