import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-xl text-gray-600">Page Not Found</p>
        <Link to="/" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;