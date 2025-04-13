import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Snippets from './Pages/Snippets'
import Navbar from './components/Navbar'
import AuthChoice from './Pages/AuthChoice'
import Compiler from './Pages/Compiler'


function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthChoice/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/snippets" element={<Snippets />} />
      <Route path="/compiler" element={<Compiler/>} />
    </Routes>

    {/* <div style={{ height: '2000px' }} className="bg-gray-800">
  <p className="text-center text-white pt-10">Scroll down to test navbar visibility/fixed position</p>
</div> */}



    </>



  );
}

export default App


// const languageMap = {
//     cpp: 12,         // C++ (GCC 9.2.0)
//     c: 7,            // C (GCC 9.2.0)
//     java: 25,        // Java (OpenJDK 13.0.1)
//     python: 38,      // Python (3.8.1)
//     javascript: 26,  // JavaScript (Node.js 12.14.0)
//     csharp: 8,       // C# (Mono 6.6.0.161)
//     go: 22,          // Go (1.13.5)
//     ruby: 40,        // Ruby (2.7.0)
//     php: 34,         // PHP (7.4.1)
//     swift: 44        // Swift (5.2.3)