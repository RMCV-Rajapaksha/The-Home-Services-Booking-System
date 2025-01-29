import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HOME from '../assets/images/2.png';
import HOME_01 from '../assets/images/1087.png';
const Home = () => {
  const services = [
    {
      title: 'Home Cleaning',
      description: 'Professional cleaning for your home needs'
    },
    {
      title: 'Repairs & Maintenance',
      description: 'Expert repairs and maintenance services'
    },
    {
      title: 'Appliance Services',
      description: 'Reliable repairs and maintenance'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[600px] bg-white overflow-hidden">
      {/* Background diagonal shapes */}
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 right-0 w-1/2 h-full"
      >
        <div className="w-full h-full origin-top-right transform -skew-x-12 bg-gradient-to-br from-teal-300 to-teal-500" />
      </motion.div>
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 right-0 w-1/2 h-full" 
        style={{ top: '20%', right: '10%' }}
      >
        <div className="w-full h-full origin-top-right transform -skew-x-12 bg-gradient-to-br from-purple-300 to-purple-500" />
      </motion.div>
      <motion.div 
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-0 right-0 w-1/2 h-full" 
        style={{ top: '40%', right: '20%' }}
      >
        <div className="w-full h-full origin-top-right transform -skew-x-12 bg-gradient-to-br from-pink-300 to-pink-500" />
      </motion.div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10 pr-4"
            >
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                Your Home<br />
                Our Priority
              </h1>
              <p className="max-w-md mb-8 text-gray-600">
                Your home deserves the best care, and that's exactly what we provide. From beginning to end, you can trust us to handle your household needs with professionalism and care, giving you peace of mind.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-white transition-colors bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex justify-center lg:justify-end"
            >
              <img 
                src={HOME}
                alt="Happy service professional"
                className="w-auto h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <img 
                src={HOME_01}
                alt="Service professional with customer"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <h2 className="mb-6 text-3xl font-bold">ABOUT US</h2>
              <p className="mb-4 text-gray-600">
                We are your trusted platform for reliable and professional home services. From cleaning to repairs, we've got you covered. Our team of experts is ready to help you with all your home needs.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Supply & Maintenance: Reliable supply for home needs</li>
                <li>• Specialized Service: Tailored solutions for specific requirements</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>


      <section>
      <div className="w-full max-w-6xl px-4 py-16 mx-auto">
      <h1 className="mb-16 font-serif text-4xl text-center">OUR SERVICES</h1>
      
      <div className="relative">
        <div className="flex items-center justify-between gap-6">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl flex flex-col items-center text-center
                  ${index === 1 ? 'bg-teal-200' : 'bg-teal-100'}`}
              >
                {service.icon}
                <h3 className="mb-4 text-xl font-medium">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
      </section>

  

      {/* Footer Banner */}
      <section className="py-12 text-white bg-gray-900">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="text-center">
            <h2 className="mb-4 font-4xl bold text-">Your Home, Our Care</h2>
            <p className="max-w-2xl mx-auto">
              Access our business home services anytime, anywhere. From cleaning and repairs to specialized care, our service pro team will handle anything that comes up.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;