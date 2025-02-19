import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Facebook, Globe, Calendar, Clock, Share2, Heart, ArrowLeft } from 'lucide-react';

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`);
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-tertiary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50">
        <div className="text-6xl">😕</div>
        <p className="text-xl text-gray-500">Service not found</p>
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center px-4 py-2 text-white transition-colors rounded-lg bg-tertiary hover:bg-secondary-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  const handleImageChange = (direction) => {
    if (!service.images) return;
    const lastIndex = service.images.length - 1;
    if (direction === 'next') {
      setCurrentImageIndex(currentImageIndex === lastIndex ? 0 : currentImageIndex + 1);
    } else {
      setCurrentImageIndex(currentImageIndex === 0 ? lastIndex : currentImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl px-4 py-8 mx-auto">
        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          {/* Image Gallery */}
          <div className="relative h-72 sm:h-96">
            {service.images && service.images.length > 0 ? (
              <>
                <img
                  src={service.images[currentImageIndex]}
                  alt={`${service.title} - ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full transition-opacity duration-500"
                />
                {service.images.length > 1 && (
                  <div className="absolute bottom-0 flex justify-center w-full gap-2 p-4">
                    {service.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-primary sm:text-3xl">{service.title}</h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 text-gray-400 transition-colors rounded-full bg-gray-50 hover:text-tertiary">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="mb-6 leading-relaxed text-gray-600">{service.description}</p>

            <div className="grid gap-4 mb-6 sm:grid-cols-2">
              <div className="flex items-center p-4 rounded-lg bg-gray-50">
                <MapPin className="w-5 h-5 mr-3 text-tertiary" />
                <span className="text-gray-600">{service.location}</span>
              </div>
              {service.contactNo && (
                <div className="flex items-center p-4 rounded-lg bg-gray-50">
                  <Phone className="w-5 h-5 mr-3 text-tertiary" />
                  <span className="text-gray-600">{service.contactNo[0]}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {service.facebookLink && (
                <a
                  href={service.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-white transition-transform bg-blue-600 rounded-lg hover:scale-105"
                >
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </a>
              )}
              {service.whatappLink && (
                <a
                  href={service.whatappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-white transition-transform bg-green-600 rounded-lg hover:scale-105"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              )}
              {service.websiteLink && (
                <a
                  href={service.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-white transition-transform rounded-lg bg-tertiary hover:scale-105"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;