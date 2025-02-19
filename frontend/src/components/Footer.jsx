// filepath: /C:/Users/ROG/OneDrive/Desktop/Projects/The Home Services Booking System/frontend/src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-secondary-1">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">HomeMate</h1>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-tertiary">About</a>
            <a href="#" className="hover:text-tertiary">Privacy Policy</a>
            <a href="#" className="hover:text-tertiary">Licensing</a>
            <a href="#" className="hover:text-tertiary">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center md:text-left">
          <p>&copy; 2023 HomeMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;