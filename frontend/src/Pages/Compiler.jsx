import React, { useState, useCallback, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import TagsInput from '../components/TagsInput';

// Language maps and constants
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
  
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Toggle theme function with useCallback
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

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

  // Conditional UI based on theme
  const uiClasses = theme === 'dark' 
    ? {
        container: "min-h-screen p-6 bg-gray-900 text-white",
        title: "text-4xl font-bold mb-6 text-center text-gray-400",
        input: "w-full sm:w-[304px] p-2 bg-gray-800 border border-gray-700 rounded text-white",
        select: "bg-gray-800 px-4 py-2 rounded border border-gray-700 text-white",
        themeButton: "border border-gray-700 px-3 py-2 mr-4 bg-gray-800 hover:bg-gray-700 rounded text-white",
        wrapper: "border border-gray-700 rounded-lg p-4 bg-gray-900",
        heading: "mb-2 font-semibold text-white",
        textarea: "w-full p-4 mb-4 rounded bg-gray-800 text-white font-mono border border-gray-700"
      }
    : {
        container: "min-h-screen p-6 bg-white text-gray-800",
        title: "text-4xl font-bold mb-6 text-center text-indigo-600",
        input: "w-full sm:w-[304px] p-2 bg-gray-50 border border-gray-300 rounded text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
        select: "bg-white px-4 py-2 rounded border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
        themeButton: "border border-gray-300 px-3 py-2 mr-4 bg-gray-50 hover:bg-gray-100 rounded text-gray-800",
        wrapper: "border border-gray-200 rounded-lg p-4 bg-white shadow-md",
        heading: "mb-2 font-semibold text-gray-700",
        textarea: "w-full p-4 mb-4 rounded bg-gray-50 text-gray-800 font-mono border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      };

  return (
    <div className={uiClasses.container}>
      <h1 className={uiClasses.title}>Code Compiler</h1>
      
      {/* Title input */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter snippet title"
          className={uiClasses.input}
        />
      </div>
  
      {/* Tags Input Component */}
      <TagsInput 
        tags={tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        suggestedTags={languageTags[language] || []}
        theme={theme}
      />
  
      <div className="mt-6 flex items-center mb-6">
        <div className="mr-4">
          <select
            className={uiClasses.select}
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

        <button 
          onClick={toggleTheme} 
          className={uiClasses.themeButton}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
  
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRunCode}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow-sm transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </button>
  
          <button
            onClick={handleSaveCode}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow-sm transition-colors"
          >
            Save
          </button>
        </div>
      </div>
  
      {/* === OUTER WRAPPER with border === */}
      <div className={uiClasses.wrapper}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Code Block */}
          <div className="flex-1">
            <h2 className={uiClasses.heading}>Code</h2>
            <div className={`rounded-lg overflow-hidden shadow-sm border ${ theme === 'dark' ? 'border-gray-900' : 'border-gray-200'}`}>
              <CodeEditor
                mode={langToMode[language] || "java"}
                theme={theme === 'dark' ? "cobalt" : "chrome"}
                value={code}
                onChange={handleCodeChange}
              />    
            </div>
          </div>
  
          {/* Input & Output Block */}
          <div className="flex flex-col flex-none w-full md:w-[40%]">
            <div>
              <h2 className={uiClasses.heading}>Input</h2>
              <textarea
                rows={5}
                className={uiClasses.textarea}
                placeholder="Custom input (if any)"
                value={input}
                onChange={handleInputChange}
              ></textarea>
            </div>
  
            <div>
              <h2 className={`mt-4 ${uiClasses.heading}`}>Output</h2>
              <textarea
                rows={10}
                className={`w-full p-4 mb-4 rounded ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-50 border-gray-300'
                } font-mono border ${
                  /error|exception|traceback/i.test(error || output)
                    ? theme === 'dark' ? 'text-red-400' : 'text-red-600'
                    : theme === 'dark' ? 'text-green-400' : 'text-green-600'
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
