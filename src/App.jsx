import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Snippets from './Pages/Snippets'
import Navbar from './Components/Navbar'
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
    </>

  );
}

export default App
