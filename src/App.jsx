import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Snippets from './Pages/Snippets'
import Navbar from './components/Navbar'
import AuthChoice from './Pages/AuthChoice'


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
    </Routes>

    {/* <div style={{ height: '2000px' }} className="bg-gray-800">
  <p className="text-center text-white pt-10">Scroll down to test navbar visibility/fixed position</p>
</div> */}



    </>



  );
}

export default App
