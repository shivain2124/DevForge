import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data (i will replace it with real data fetched from the backend)
  const userMetrics = {
    snippetsCreated: 15,
    collaborators: 3,
    recentActivity: [
      { id: 1, action: 'Created snippet', timestamp: '2023-10-01' },
      { id: 2, action: 'Compiled code', timestamp: '2023-10-02' },
      { id: 3, action: 'Shared snippet', timestamp: '2023-10-03' },
    ],
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <p className="text-sm text-blue-600">Snippets Created</p>
          <p className="text-2xl font-bold text-blue-800">{userMetrics.snippetsCreated}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md">
          <p className="text-sm text-green-600">Collaborators</p>
          <p className="text-2xl font-bold text-green-800">{userMetrics.collaborators}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
          <p className="text-sm text-purple-600">Active Projects</p>
          <p className="text-2xl font-bold text-purple-800">5</p> {/* Replace with actual data */}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/snippets"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all duration-300"
          >
            Create New Snippet
          </Link>
          <Link
            to="/compiler"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-all duration-300"
          >
            Compile Code
          </Link>
          <Link
            to="/profile"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-all duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          {userMetrics.recentActivity.map((activity) => (
            <li key={activity.id} className="flex justify-between text-gray-700">
              <span>{activity.action}</span>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;