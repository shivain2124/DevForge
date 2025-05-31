import {Routes,Route} from 'react-router-dom'
import React from 'react'
import {AuthProvider} from './context/auth.context'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Snippets from './Pages/Snippets'
import Navbar from './components/Navbar'
import LoginPage from './Pages/LoginPage'
import Compiler from './Pages/Compiler'
import ForgotPasswordPage from './Pages/ForgotPasswordPage' 
import Dashboard from './Pages/Dashboard'
import ProfilePage from './Pages/ProfilePage'
import SettingsPage from './Pages/SettingsPage'
import DiscussionPage from './Pages/DiscussionPage'
import NotFoundPage from './Pages/NotFoundPage'
import SignupPage from './Pages/SignupPage'


function App() {
  return(
  <AuthProvider>
    <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginPage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/snippets" element={<Snippets />} />
      <Route path="/compiler" element={<Compiler/>} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />}/>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage/>} />
      <Route path='/discussion/:postId' element={<DiscussionPage/>} />
      <Route path="/*" element={<NotFoundPage/>}/></Routes>
      </div>
      </AuthProvider>


  );
}

export default App

