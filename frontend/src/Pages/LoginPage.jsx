// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {authService} from "../services/auth.service";
// import { useAuth } from "../context/auth.context";
// import LoginButton from "./LoginButton";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login, error: authError, loading } = useAuth();

//   const [formData, setFormData] = useState({email: '',password: ''});
//   const [showPassword, setShowPassword] = useState(false);

//    const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = await login(formData);
//     if (result.success) {
//       navigate('/dashboard'); // Redirect after successful login
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-gray-800  bg-white" >
//       {/* Header */}
//       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-6 text-center">
//         Welcome Back to DevForge
//       </h2>
//       <p className="mb-8 text-sm sm:text-lg text-gray-600 text-center px-4">
//         Please log in to continue:
//       </p>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 px-4 sm:px-0">

//         {authError && (
//           <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
//             {authError}
//           </div>
//         )}

        
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter your email"
//             className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xs sm:text-base"
//           />
//         </div>

//         {/* Password Input */}
//         <div>
//           <label
//             htmlFor="password"
//             className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
//           >
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text":"password"}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xs sm:text-base"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 flex items-center px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-400 hover:text-blue-400 focus:outline-none"
//             >
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//           </div>
//         </div>

//         {/* Forgot Password Link */}
//         <div className="flex justify-end">
//           <Link
//             to="/forgot-password"
//             className="text-xs sm:text-sm text-blue-600 hover:underline focus:outline-none"
//           >
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Submit Button */}
//        <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
//           <LoginButton label={loading ? 'Logging in...' : 'Log In'} />
//         </div>
//       </form>

//       {/* Social Login Buttons */}
//       <div className="mt-6 w-full max-w-md space-y-4 px-4 sm:px-0">
//         <div className="flex items-center justify-center">
//           <span className="text-xs sm:text-sm text-gray-400">
//             Or continue with
//           </span>
//         </div>

//         {/* Google and GitHub Buttons */}
//         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
//           {/* Google Button */}
//           <button
//             type="button"
//             className="relative flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 border-2 border-gray-300 rounded-full overflow-hidden transition-all duration-200 group hover:border-blue-600 bg-white"
//           >
//             {/* Hover background effect */}
//             <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-200 ease-out bg-white z-0 rounded-full"></span>

//             {/* Google Icons */}
//             <div className="relative z-10 w-5 h-5 mr-2">
//               {/* Normal SVG */}
//               <svg
//                 className="absolute top-0 left-0 w-full h-full transition-opacity duration-200 opacity-100 group-hover:opacity-0"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#4285F4"
//                 ></path>
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#34A853"
//                 ></path>
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#FBBC05"
//                 ></path>
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#EA4335"
//                 ></path>
//                 <path d="M1 1h22v22H1z" fill="none"></path>
//               </svg>

//               {/* Inverted SVG */}
//               <svg
//                 className="absolute top-0 left-0 w-full h-full transition-opacity duration-200 opacity-0 group-hover:opacity-100"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   fill="#F4B742"
//                 ></path>
//                 <path
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   fill="#CB35A8"
//                 ></path>
//                 <path
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   fill="#0544FB"
//                 ></path>
//                 <path
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   fill="#35CBEA"
//                 ></path>
//                 <path d="M1 1h22v22H1z" fill="none"></path>
//               </svg>
//             </div>

//             {/* Text */}
//             <span className="relative z-10 transition-all duration-200 group-hover:text-black">
//               Sign in with Google
//             </span>
//           </button>

//           {/* GitHub Button */}
//           <button
//             type="button"
//             className="w-full sm:w-auto relative flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 border-2 border-gray-300 rounded-full overflow-hidden transition-all duration-200 group hover:border-blue-600 bg-white"
//           >
//             {/* Github SVG */}
//             <svg
//               className="w-5 h-5 mr-2 transition-all duration-200 group-hover:invert relative z-10"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//             >
//               <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.713 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
//             </svg>
//             {/* Text */}
//             <span className="relative z-10 transition-all duration-200 group-hover:text-black">
//               Sign in with GitHub
//             </span>
//             {/* Hover Effect */}
//             <span className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 ease-out group-hover:bg-white z-0"></span>
//           </button>
//         </div>
//       </div>

//      {/* Footer */}
//       <div className="mt-6 text-xs sm:text-sm text-gray-500 text-center px-4 sm:px-0">
//         <p>
//           Don't have an account?{" "}
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-blue-600 hover:underline focus:outline-none"
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import LoginButton from './LoginButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error: authError, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate('/profile');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-white">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-6 text-center">
        Welcome Back to DevForge
      </h2>
      <p className="mb-8 text-sm sm:text-lg text-gray-600 text-center px-4">
        Please log in to continue:
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 px-4 sm:px-0">
        
        {/* Error Message */}
        {authError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {authError}
          </div>
        )}

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xs sm:text-base"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xs sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-400 hover:text-blue-400 focus:outline-none"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs sm:text-sm text-blue-600 hover:underline focus:outline-none">
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
          <LoginButton label={loading ? 'Logging in...' : 'Log In'} />
        </div>
      </form>

      {/* Keep your existing social login buttons here */}
      {/* ... your Google and GitHub buttons ... */}

      {/* Footer */}
      <div className="mt-6 text-xs sm:text-sm text-gray-500 text-center px-4 sm:px-0">
        <p>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
