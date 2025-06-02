import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { snippetService } from '../services/snippet.service';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    snippetsCreated: 0,
    totalLikes: 0,
    publicSnippets: 0,
    recentSnippets: [],
    loading: true
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Get user's snippets
      const snippetsResponse = await snippetService.getAllSnippets();
      const snippets = snippetsResponse.snippets || [];
      
      // Get liked snippets count
      const likedResponse = await snippetService.getLikedSnippets();
      const likedSnippets = likedResponse.snippets || [];
      
      // Calculate metrics
      const totalLikes = snippets.reduce((sum, snippet) => sum + (snippet.likesCount || 0), 0);
      const publicSnippets = snippets.filter(snippet => snippet.visibility === 'public').length;
      const recentSnippets = snippets
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(snippet => ({
          id: snippet._id,
          action: `Created "${snippet.title}"`,
          timestamp: new Date(snippet.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        }));

      setDashboardData({
        snippetsCreated: snippets.length,
        totalLikes: totalLikes,
        publicSnippets: publicSnippets,
        likedSnippetsCount: likedSnippets.length,
        recentSnippets: recentSnippets,
        loading: false
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setDashboardData(prev => ({ ...prev, loading: false }));
    }
  };

  if (dashboardData.loading) {
    return (
      <div className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Welcome back, {user?.username || 'Developer'}!
      </h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <p className="text-sm text-blue-600">Total Snippets</p>
          <p className="text-2xl font-bold text-blue-800">{dashboardData.snippetsCreated}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <p className="text-sm text-green-600">Public Snippets</p>
          <p className="text-2xl font-bold text-green-800">{dashboardData.publicSnippets}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
          <p className="text-sm text-purple-600">Total Likes Received</p>
          <p className="text-2xl font-bold text-purple-800">{dashboardData.totalLikes}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow-md">
          <p className="text-sm text-red-600">Snippets Liked</p>
          <p className="text-2xl font-bold text-red-800">{dashboardData.likedSnippetsCount}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/compiler"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 text-center"
          >
            Create New Snippet
          </Link>
          <Link
            to="/explore"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 text-center"
          >
            Explore Community
          </Link>
          <Link
            to="/snippets"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 text-center"
          >
            Manage Snippets
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        {dashboardData.recentSnippets.length > 0 ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-3">
              {dashboardData.recentSnippets.map((activity) => (
                <li key={activity.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-gray-700">{activity.action}</span>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {activity.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No recent activity yet</p>
            <Link
              to="/compiler"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Snippet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
