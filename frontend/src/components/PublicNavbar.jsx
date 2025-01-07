import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LOGO from '../assets/images/logo.png';

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/terms"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900'
                }`
              }
            >
              Terms & Condition
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="items-center hidden space-x-4 md:flex">
            <NavLink
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
            >
              LOGIN
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-900 rounded hover:bg-gray-800"
            >
              SIGNUP
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
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
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Services
              </NavLink>
              <NavLink
                to="/terms"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Terms & Condition
              </NavLink>
              <div className="flex flex-col pt-4 space-y-2">
                <NavLink
                  to="/login"
                  className="px-3 py-2 text-base font-medium text-gray-900 transition-colors hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                >
                  LOGIN
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-3 py-2 text-base font-medium text-center text-white transition-colors bg-gray-900 rounded hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  SIGNUP
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default PublicNavbar;