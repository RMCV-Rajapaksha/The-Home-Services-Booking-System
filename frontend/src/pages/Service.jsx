import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

function Service() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchEvents = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/posts', {
        params: {
          query: searchTerm,
          location: location,
          page: pageNumber,
          size: 9,
        },
      });
      setEvents(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchEvents(0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchEvents(newPage);
  };

  return (
    <div className="min-h-screen px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSearch} className="relative mb-8">
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
            type="submit"
          >
            <Search className="w-5 h-5 text-gray-400" />
          </motion.button>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 mt-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">Select Location</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
        </form>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white rounded-lg shadow-md"
                >
                  <h2 className="mb-2 text-xl font-bold text-gray-800">{event.title}</h2>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="text-gray-600">{event.location}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 mx-1 text-white bg-teal-500 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 mx-1">{page + 1} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page + 1 >= totalPages}
                className="px-4 py-2 mx-1 text-white bg-teal-500 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Service;