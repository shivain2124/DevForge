import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Simulate signup request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Simulate an API call to create the account
      console.log('User signed up:', formData);
      setSuccess('Account created successfully!');
      setError('');
      setTimeout(() => navigate('/auth'), 2500); // Redirect to login after 5 seconds
    } catch (err) {
      setError('An error occurred while creating your account.');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 bg-gradient-to-br from-gray-900 to-gray-700">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-white mb-6 text-center"> 
      {/* text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 */}
        Create Your Account
      </h2>
      <p className="mb-8 text-sm sm:text-lg text-gray-300 text-center px-4">
        Fill out the form below to sign up.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 px-4 sm:px-0"
      >
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-xs sm:text-base"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-xs sm:text-base"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-xs sm:text-base"
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-xs sm:text-base"
          />
        </div>

        {/* Error or Success Message */}
        {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
        {success && <p className="text-green-400 text-xs sm:text-sm">{success}</p>}

        {/* Submit Button */}
        <LoginButton label='Signup'/>
      </form>

      {/* Back to Login Link */}
      <div className="mt-6 text-xs sm:text-sm text-gray-400 text-center px-4 sm:px-0">
        <p>
          Already have an account?{' '}
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

export default SignupPage;