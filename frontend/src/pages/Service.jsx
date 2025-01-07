import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

function Service() {
  const [searchTerm, setSearchTerm] = useState('');

  const events = Array(8).fill({
    title: 'Toronto Experimental Dance Festival',
    date: '18 JAN'
  });

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <h2 className="mb-2 text-xl font-bold text-gray-800">{event.title}</h2>
              <p className="text-gray-600">{event.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;