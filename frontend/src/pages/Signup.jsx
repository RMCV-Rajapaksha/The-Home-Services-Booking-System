import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PIC from '../assets/images/pic_01.jpg';
import GOOGLE from '../assets/images/google (2).png';
import APPLE from '../assets/images/apple-logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col-reverse w-full max-w-6xl overflow-hidden bg-white shadow-xl md:flex-row rounded-3xl">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full p-12 md:w-1/2"
        >
          <h1 className="mb-8 text-3xl font-bold text-gray-800">Get Started Now</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email address</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
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

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="block ml-2 text-sm text-gray-700">
                I agree to the terms & policy
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 font-medium text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              Signup
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
                Sign in with Google
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center flex-1 gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <img src={APPLE} alt="Apple" className="w-5 h-5" />
                Sign in with Apple
              </motion.button>
            </div>

            <p className="text-sm text-center text-gray-600">
              Have an account?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                Sign In
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
            src={PIC}
            alt="People working together"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;