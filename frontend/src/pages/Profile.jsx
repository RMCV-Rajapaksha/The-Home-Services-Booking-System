import React from 'react';
import { Edit2, Trash2, User } from 'lucide-react';

const Profile = () => {
  const services = [
    {
      title: "Interior and Exterior Painting",
      description: "Transform your living or workspace with our top-notch painting services, tailored to meet your specific needs. Our skilled painters provide high-quality finishes that enhance both the aesthetic appeal and durability of your property. Whether you're looking to refresh your interiors with vibrant colors or protect and beautify your exteriors, we use .......",
      image: "/api/placeholder/200/150"
    },
    // Duplicate entries for demo purposes
  ].concat(Array(4).fill({
    title: "Interior and Exterior Painting",
    description: "Transform your living or workspace with our top-notch painting services, tailored to meet your specific needs. Our skilled painters provide high-quality finishes that enhance both the aesthetic appeal and durability of your property. Whether you're looking to refresh your interiors with vibrant colors or protect and beautify your exteriors, we use .......",
    image: "/api/placeholder/200/150"
  }));

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Servicers</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <h2 className="font-medium">Chamara Vishwajith</h2>
              <div className="text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="ml-2">owner</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="ml-2">chamara@gmail.com</span>
              </div>
            </div>
            <div className="w-12 h-12 overflow-hidden bg-blue-500 rounded-full">
              <User className="w-full h-full p-2 text-white" />
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-48 h-32 rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">&lt;</button>
            <button className="px-3 py-1 text-white bg-blue-500 border rounded">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">...</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">9</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">10</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">&gt;</button>
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Chamara Vishwajith"
              className="px-4 py-2 border rounded"
            />
            <input 
              type="email" 
              placeholder="chamara@gmail.com"
              className="px-4 py-2 border rounded"
            />
            <button className="px-6 py-2 text-white bg-blue-900 rounded hover:bg-blue-800">
              Save
            </button>
            <button className="px-6 py-2 text-white bg-blue-900 rounded hover:bg-blue-800">
              Delete
            </button>
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full py-3 text-white bg-blue-900 rounded-lg hover:bg-blue-800">
            Create new Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;