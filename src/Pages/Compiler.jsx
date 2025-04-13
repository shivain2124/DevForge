import React,{useState} from 'react'

const languageMap = {
    cpp: 12,         // C++ (GCC 9.2.0)
    c: 7,            // C (GCC 9.2.0)
    java: 25,        // Java (OpenJDK 13.0.1)
    python: 38,      // Python (3.8.1)
    javascript: 26,  // JavaScript (Node.js 12.14.0)
    csharp: 8,       // C# (Mono 6.6.0.161)
    go: 22,          // Go (1.13.5)
    ruby: 40,        // Ruby (2.7.0)
    php: 34,         // PHP (7.4.1)
    swift: 44        // Swift (5.2.3)
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

    const handleRunCode = async()=>{
        setIsLoading(true);
        setOutput('');
        setError('');
    

    try{
        const response = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true`, {
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
        const result=await response.json();
        const {stdout,stderr,compiler_output,status} = result;

        if (status.description !== 'Accepted') {
            setError(`Error: ${status.description}`);
        } else{
            setOutput(stdout || 'No output');
        }
    } catch(err){
        setError('An error occurred while running the code');
    }
    finally{
        setIsLoading(false);
    }}
    

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

        
    </div>
  )
}

export default Compiler