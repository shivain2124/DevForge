import React,{useState} from 'react'

const languageMap = {
    cpp: 54,      // C++ (GCC 9.2.0)
    java: 62,     // Java (OpenJDK 13.0.1)
    python: 71,   // Python (3.8.1)
    javascript: 63, // JavaScript (Node.js 12.14.0)
    c: 50,        // C (GCC 9.2.0)
    ruby: 72,     // Ruby (2.7.0)
    go: 60,       // Go (1.13.5)
    rust: 73,     // Rust (1.40.0)
    swift: 83,    // Swift (5.2.3)
    kotlin: 78    // Kotlin (1.3.70)
  };
  
  
  

const Compiler = () => {
    const [language,setLanguage] =useState('cpp');
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const JUDGE0_API_URL='https://judge0-ce.p.rapidapi.com'
    const RAPIDAPI_KEY='be0b0e2eabmsh3cff064fdff4f4ap180e74jsnd129d3856f32'
    const RAPIDAPI_HOST='judge0-ce.p.rapidapi.com'
    
    const handleRunCode = async () => {
        setIsLoading(true);
        setOutput('');
        setError('');
      
        try {
          const postResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=false`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': RAPIDAPI_KEY,
              'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
            body: JSON.stringify({
              language_id: languageMap[language],
              source_code: btoa(code),
              stdin: btoa(input),
            }),
          });
      
          const { token } = await postResponse.json();
      
          // Poll for result
          let result = null;
          while (true) {
            const getResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true`, {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
              },
            });
      
            result = await getResponse.json();
      
            if (result.status.id <= 2) {
              // In Queue / Processing
              await new Promise(res => setTimeout(res, 1000));
            } else {
              break;
            }
          }
          if (res.status === 429) {
            alert("Rate limit exceeded. Try again after 24 hours or upgrade your API plan.");
          }
          
      
          const { stdout, stderr, compile_output, status } = result;
          console.log(JSON.stringify(result, null, 2));
      
          if (status.id === 3) {
            setOutput(stdout ? atob(stdout) : "No output");
          } else if (compile_output) {
            setError("Compilation Error:\n" + atob(compile_output));
          } else if (stderr) {
            setError("Runtime Error:\n" + atob(stderr));
          } else {
            setError(`Error: ${status.description}`);
          }
        } catch (err) {
          setError('An error occurred while running the code');
        } finally {
          setIsLoading(false);
        }
      };
      

  return (
    <div className='min-h-screen p-6 bg-gray-900 text-white'>
        <h1 className='text-4xl font-bold mb-6 text-center text-gray-400'>Code Compiler</h1>

        <div className='mb-4'>
            <label className='mr-2'>Select Language</label>
            <select 
                className="bh-gray-800 px-4 py-2 rounded"
                value={language}
                onChange={(e)=> setLanguage(e.target.value)}
                >
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                    <option value="ruby">Ruby</option>
                    <option value="php">PHP</option>
                    <option value="swift">Swift</option>
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h2 className='mb-2 font-semibold'>Code</h2>
                <textarea
                    rows={15}
                    className="w-full p-4 rounded bg-gray-800 text-white font-mono"
                    placeholder="// Write your code here"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
          ></textarea>

          <div>
            <h2 className='mb-2 font-semibold'>Input</h2>
            <textarea 
                rows={5}
                className="w-full p-4 mb-4 rounded bg-gray-800 text-white font-mono"
                placeholder="Custom input (if any)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>

            <button 
                onClick={handleRunCode}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded mb-4"
                disabled={isLoading}>
                    {isLoading ? 'Running...' : 'Run Code'}
                </button>

                {error && (
            <div className="text-red-500 mt-2 whitespace-pre-wrap">{error}</div>
          )}

                {output && (
                    <div>
                    <h2 className="mt-4 mb-2 font-semibold">Output</h2>
                    <pre className="bg-gray-800 p-4 rounded text-green-400 whitespace-pre-wrap">
                        {output}
                    </pre>
                    </div>
                )}
                </div>
            </div>
            {/* console.log(JSON.stringify(result, null, 2)); */}
        </div>

        
    </div>
  )
};

export default Compiler