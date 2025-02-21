import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from "./context/AuthContext";
import LOGO from '../assets/images/logo.png';
import 'react-toastify/dist/ReactToastify.css';

const PrivateNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, auth } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <img src={LOGO} alt="HomeMate" className="w-auto h-40" />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            <NavLink
              to="/admin-post"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <FileText size={18} />
              <span>Posts</span>
            </NavLink>
            <NavLink
              to="/create-post"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              <PlusCircle size={18} />
              <span>Create Post</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-colors bg-gray-900 rounded hover:bg-gray-800"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/admin-post"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FileText size={18} />
                <span>Posts</span>
              </NavLink>
              <NavLink
                to="/create-post"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle size={18} />
                <span>Create Post</span>
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 space-x-2 text-base font-medium text-white transition-colors bg-gray-900 rounded hover:bg-gray-800"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PrivateNavbar;