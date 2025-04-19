import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignupPage from './Pages/SignUpPage'
import Snippets from './Pages/Snippets'
import Navbar from './components/Navbar'
import LoginPage from './Pages/LoginPage'
import Compiler from './Pages/Compiler'
import ForgotPasswordPage from './Pages/ForgotPasswordPage' 
import Dashboard from './Pages/Dashboard'
import ProfilePage from './Pages/ProfilePage'
import SettingsPage from './Pages/SettingsPage'


function App() {
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/snippets" element={<Snippets />} />
      <Route path="/compiler" element={<Compiler/>} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="settings" element={<SettingsPage/>} />
    </Routes>

    {/* <div style={{ height: '2000px' }} className="bg-gray-800">
  <p className="text-center text-white pt-10">Scroll down to test navbar visibility/fixed position</p>
</div> */}



    </>



  );
}

export default App
