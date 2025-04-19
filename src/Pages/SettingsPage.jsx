import React, { useState } from 'react';

const SettingsPage = () => {
  // Mock user data (replace with actual data fetched from your backend)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    theme: 'light', // Default theme
    isPrivate: false, // Profile privacy
    notificationsEnabled: true, // Notification preferences
    twoFactorEnabled: false, // Two-factor authentication
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    // Send data to the backend
    console.log('Form Data Submitted:', formData);
    alert('Settings updated successfully!');
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion initiated');
      // Call API to delete the account
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen py-8 px-4 sm:px-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Settings</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Privacy */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Privacy</h2>
          <div className="flex items-center gap-4">
            <label htmlFor="isPrivate" className="text-sm font-medium text-gray-700">
              Make my profile private
            </label>
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your current password"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter a new password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Confirm your new password"
              />
            </div>
          </div>
        </div>

        {/* Change Theme */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Theme Preference</h2>
          <select
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </div>

        {/* Notification Preferences */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
          <div className="flex items-center gap-4">
            <label htmlFor="notificationsEnabled" className="text-sm font-medium text-gray-700">
              Enable email notifications
            </label>
            <input
              type="checkbox"
              id="notificationsEnabled"
              name="notificationsEnabled"
              checked={formData.notificationsEnabled}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Multi-Factor Authentication</h2>
          <div className="flex items-center gap-4">
            <label htmlFor="twoFactorEnabled" className="text-sm font-medium text-gray-700">
            Multi-Factor Authentication (MFA) is an authentication method that requires you to provide two or more verification factors to gain access to your account. In addition to username and password, MFA requires you to verify your email on every login, which decreases the likelihood of someone stealing your account.
            </label>
            <input
              type="checkbox"
              id="twoFactorEnabled"
              name="twoFactorEnabled"
              checked={formData.twoFactorEnabled}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Linked Accounts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Linked Accounts</h2>
          <p className="text-sm text-gray-700">
            You have no linked accounts.{' '}
            <button className="text-blue-600 hover:underline">Link an account</button>
          </p>
        </div>



        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all duration-300"
          >
            Save Changes
          </button>
        </div>

                {/* Delete Account */}
                <div>
          <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
          <p className="text-sm text-gray-700 mb-2">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-300"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;