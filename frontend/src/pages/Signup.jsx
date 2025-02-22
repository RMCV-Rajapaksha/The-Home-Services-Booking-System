import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PIC_01 from '../assets/images/pic_01.jpg';
import GOOGLE from '../assets/images/google (2).png';
import APPLE from '../assets/images/apple-logo.png';
import axiosInstance from '../utils/axiosInstance';
import toast, { Toaster } from 'react-hot-toast'; 

import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupPromise = axiosInstance.post('/register', {
      username: formData.username,
      password: formData.password
    });

    toast.promise(signupPromise, {
      loading: 'Creating your account...',
      success: 'Account created successfully!',
      error: (err) => err.response?.data?.message || 'Failed to create account'
    });

    try {
      await signupPromise;
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
       <Toaster position="top-right" />
      <div className="flex flex-col-reverse w-full max-w-6xl overflow-hidden bg-white shadow-xl md:flex-row rounded-3xl">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full p-12 md:w-1/2"
        >
          <motion.div
            initial={{ y:0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Create an account</h1>
            <p className="mb-8 text-gray-600">Enter your details to sign up</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="block ml-2 text-sm text-gray-700">
                Agree to terms and conditions
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 font-medium text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              Sign Up
            </motion.button>

            <div className="text-sm text-center text-gray-500">Or</div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <img src={GOOGLE} alt="Google" className="w-5 h-5" />
                Sign up with Google
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <img src={APPLE} alt="Apple" className="w-5 h-5" />
                Sign up with Apple
              </motion.button>
            </div>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                Login
              </a>
            </p>
          </form>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2"
        >
          <img
            src={PIC_01}
            alt="Woman working"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>

    </div>
  );
};

export default Signup;