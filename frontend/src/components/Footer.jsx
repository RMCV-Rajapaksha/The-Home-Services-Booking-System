import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white bg-primary">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">HomeServices</h3>
            <p className="text-gray-300">
              Find and connect with local service providers for all your home needs.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 transition-colors hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contact@homeservices.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Service Street</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center text-gray-300 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} HomeServices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;