import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Simulate password reset request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Simulate an API call to send the reset link
      console.log(`Reset link sent to: ${email}`);
      setSuccess('A password reset link has been sent to your email.');
      setError('');
    } catch (err) {
      setError('An error occurred while sending the reset link.');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 bg-gradient-to-br from-gray-900 to-gray-700">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 text-center">
        Forgot Your Password?
      </h2>
      <p className="mb-8 text-sm sm:text-lg text-gray-300 text-center px-4">
        Enter your email address below, and we'll send you a link to reset your password.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 px-4 sm:px-0"
      >
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-xs sm:text-base"
          />
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
        {success && <p className="text-green-400 text-xs sm:text-sm">{success}</p>}

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
        >
          Reset Password
        </button> */}
        <LoginButton label="Reset Password" />

      </form>

      {/* Back to Login Link */}
      <div className="mt-6 text-xs sm:text-sm text-gray-400 text-center px-4 sm:px-0">
        <p>
          Remember your password?{' '}
          <button
            onClick={() => navigate('/auth')}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;