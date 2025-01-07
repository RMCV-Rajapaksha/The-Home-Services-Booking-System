

import { motion } from 'framer-motion';
import { Share2, Heart } from 'lucide-react';
import LOGO from '../assets/images/pic_01.jpg';

const EventCard = ({ event, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden bg-white rounded-lg shadow-sm"
    >
      <div className="relative">
        <img 
          src={LOGO}
          alt={event.title}
          className="object-cover w-full h-48"
        />
        <div className="absolute px-2 py-1 text-sm font-medium bg-white rounded-lg top-2 right-2">
          <span className="block text-lg">18</span>
          <span className="text-xs">JAN</span>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-2 text-sm text-gray-500">Performance</p>
        <h3 className="mb-4 font-medium">{event.title}</h3>
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
          >
            <Heart className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );


  export default EventCard;