import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import PIC_02 from '../assets/images/pic_02.jpg';
import GOOGLE from '../assets/images/google (2).png';
import APPLE from '../assets/images/apple-logo.png';

const initialFormData = {
  username: "",
  password: "",
  rememberMe: false,
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.username, formData.password);
      toast.success("Logged in successfully!");
      navigate("/dashboard"); // Redirect to a protected route after login
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      setFormError({ general: "Invalid username or password" });
    } finally {
      setLoading(false);
    }
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
          <motion.div
            initial={{ y:0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Welcome back!</h1>
            <p className="mb-8 text-gray-600">Enter your Credentials to access your account</p>
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
              {formError.username && <p className="error">{formError.username}</p>}
            </div>

            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  forgot password
                </Link>
              </div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              {formError.password && <p className="error">{formError.password}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="block ml-2 text-sm text-gray-700">
                Remember for 30 days
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 font-medium text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
            >
              {loading ? "Logging in..." : "Login"}
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
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
                Sign Up
              </Link>
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
            src={PIC_02}
            alt="Woman working"
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;