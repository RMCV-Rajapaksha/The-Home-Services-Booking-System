import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Facebook, Globe, Share2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom Card Components
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

// Custom Input Component
const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${className}`}
    {...props}
  />
);

// Custom Button Component
const Button = ({ children, className = '', disabled = false, ...props }) => (
  <button
    className={`px-4 py-2 font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

// Custom Select Component
const Select = ({ children, className = '', ...props }) => (
  <select
    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${className}`}
    {...props}
  >
    {children}
  </select>
);

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", 
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala",
  "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const categories = [
  "Plumbing", "Electrical", "Carpentry", "Cleaning", "Painting",
  "Gardening", "Moving", "Repair", "Installation", "Other"
];

const Service = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  const fetchServices = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/posts?page=${pageNumber}&size=9&query=${searchTerm}&location=${location}`);
      const data = await response.json();
      setServices(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchServices(0);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleCardClick = (id) => {
    navigate(`/service/${id}`);
  };

  const ServiceCard = ({ service, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
      onClick={() => handleCardClick(service.id)}
    >
      <div className="relative">
        {service.images && service.images[0] ? (
          <img
            src={service.images[0]}
            alt={service.title}
            className="object-cover w-full h-48"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        {service.category && (
          <div className="absolute px-2 py-1 text-sm font-medium text-white bg-teal-500 rounded-lg top-2 left-2">
            {service.category[0]}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">{service.title}</h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{service.description}</p>
        
        <div className="flex items-center mb-2 text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{service.location}</span>
        </div>
        
        {service.contactNo && (
          <div className="flex items-center mb-2 text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span className="text-sm">{service.contactNo[0]}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-4 space-x-2">
          <div className="flex space-x-2">
            {service.facebookLink && (
              <motion.a
                href={service.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 text-blue-600 rounded-full bg-blue-50"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
            )}
            {service.websiteLink && (
              <motion.a
                href={service.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 text-teal-600 rounded-full bg-teal-50"
              >
                <Globe className="w-4 h-4" />
              </motion.a>
            )}
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(service.id);
              }}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites.has(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Share2 className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Local Services</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select Location</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </Select>
                
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>
              </div>
              
              <Button type="submit" className="w-full">
                Search Services
              </Button>
            </form>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full border-t-teal-500 animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>

            {services.length > 0 && (
              <div className="flex justify-center mt-8 space-x-4">
                <Button
                  onClick={() => fetchServices(page - 1)}
                  disabled={page === 0}
                  className="text-teal-500 bg-white border border-teal-500 hover:bg-teal-50"
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white rounded-md">
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  onClick={() => fetchServices(page + 1)}
                  disabled={page + 1 >= totalPages}
                  className="text-teal-500 bg-white border border-teal-500 hover:bg-teal-50"
                >
                  Next
                </Button>
              </div>
            )}

            {services.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-xl text-gray-500">No services found</p>
                <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Service;