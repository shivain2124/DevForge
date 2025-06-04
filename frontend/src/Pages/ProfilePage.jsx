import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import Dashboard from './Dashboard';
import Snippets from './Snippets';
import LikedSnippetPage from './LikedSnippetPage';
import {useAuth} from '../context/auth.context';
import {snippetService} from '../services/snippet.service';


const ProfilePage = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('overview');
  const navigate=useNavigate();
  const {user} = useAuth();
  const [userStats, setUserStats] = useState({
    postsCount: 0,
    likesCount: 0,
  });
useEffect(() => {
  if (!user) {
    navigate('/auth', { replace: true });
  }
}, [user, navigate]);


  useEffect(() => {
    if(user){
      loadUserStats();
    } 
  }, [user]);

  const loadUserStats = async () => {
    try {
      const response = await snippetService.getAllSnippets();
      const snippets = response.snippets || [];
      const totalLikes = snippets.reduce((sum, snippet) => sum + (snippet.likesCount || 0), 0);
      
      setUserStats({
        postsCount: snippets.length,
        likesCount: totalLikes,
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const userData = {
    name: user?.username || 'User',
    email: user?.email || 'user@example.com',
    bio: 'Passionate developer sharing code snippets with the DevForge community',
    postsCount: userStats.postsCount,
    likesCount: userStats.likesCount,
  };


  return (
    <div className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-10">
      {/* Profile Page Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Static Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-md">
          {/* User Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userData.name.toUpperCase().split(' ').map((name) => name[0]).join('')}
            </div>
          </div>

          {/* User Info */}
          <p className="text-lg font-semibold text-gray-800">{userData.name}</p>
          <p className="text-sm text-gray-600">{userData.email}</p>
          <p className="mt-4 text-gray-700">{userData.bio}</p>

          {/* Quick Stats */}
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600">
              Posts: <span className="font-semibold text-gray-800">{userData.postsCount}</span>
            </p>
            <p className="text-sm text-gray-600">
              Likes: <span className="font-semibold text-gray-800">{userData.likesCount}</span>
            </p>
          </div>
        </div>

        {/* Right Section: Dynamic Content */}
        <div className="w-full md:w-3/4">
          {/* Mini Navbar */}
          <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-4 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded ${
                activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-all duration-300`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-4 py-2 rounded ${
                activeTab === 'posts' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-all duration-300`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('likes')}
              className={`px-4 py-2 rounded ${
                activeTab === 'likes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-all duration-300`}
            >
              Likes
            </button>
            
            <button
               onClick={() => setActiveTab('settings')}

              className={`px-4 py-2 rounded ${
                activeTab === 'settings' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-all duration-300`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div>
                <Dashboard/>
              </div>
            )}
            {activeTab === 'posts' && (
              <div>
                <Snippets />
              </div>
            )}
            {activeTab === 'likes' && (
              <div>
                <LikedSnippetPage/>
                {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Likes</h2>
                <p className="text-gray-700">This section will display all posts you have liked.</p> */}
              </div>
            )}
            {activeTab === 'shared' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Shared With You</h2>
                <p className="text-gray-700">This section will display posts shared with you by others.</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <SettingsPage/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;