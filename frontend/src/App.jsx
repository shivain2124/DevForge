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
import ExplorePage from './Pages/Explore'
import SnippetDetailPage from './Pages/SnippetDetailPage'
import LikedSnippetPage from './Pages/LikedSnippetPage'
import SmoothScrolling from './components/SmoothScrolling'
import PageTransition from './components/PageTransition'
import { AnimatePresence } from 'framer-motion'


function App() {

  return(
   <AuthProvider>
      <SmoothScrolling>
        <div>
          <Navbar/>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/auth" element={<PageTransition><LoginPage/></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login/></PageTransition>} />
              <Route path="/snippets" element={<PageTransition><Snippets /></PageTransition>} />
              <Route path="/compiler" element={<PageTransition><Compiler/></PageTransition>} />
              <Route path='/forgot-password' element={<PageTransition><ForgotPasswordPage /></PageTransition>}/>
              <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />
              <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
              <Route path="/settings" element={<PageTransition><SettingsPage/></PageTransition>} />
              <Route path="/explore" element={<PageTransition><ExplorePage /></PageTransition>} />
              <Route path="/snippet/:id" element={<PageTransition><SnippetDetailPage /></PageTransition>} />
              <Route path='/discussion/:postId' element={<PageTransition><DiscussionPage/></PageTransition>} />
              <Route path="/liked" element={<PageTransition><LikedSnippetPage /></PageTransition>} />
              <Route path="/*" element={<PageTransition><NotFoundPage/></PageTransition>}/>
            </Routes>
          </AnimatePresence>
        </div>
      </SmoothScrolling>
    </AuthProvider>
  );
}

export default App

