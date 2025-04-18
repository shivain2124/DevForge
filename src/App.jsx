import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignupPage from './Pages/SignUpPage'
import Snippets from './Pages/Snippets'
import Navbar from './components/Navbar'
import AuthChoice from './Pages/AuthChoice'
import Compiler from './Pages/Compiler'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'


function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthChoice/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/snippets" element={<Snippets />} />
      <Route path="/compiler" element={<Compiler/>} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
      <Route path="/signup" element={<SignupPage/>} />
    </Routes>

    {/* <div style={{ height: '2000px' }} className="bg-gray-800">
  <p className="text-center text-white pt-10">Scroll down to test navbar visibility/fixed position</p>
</div> */}



    </>



  );
}

export default App
