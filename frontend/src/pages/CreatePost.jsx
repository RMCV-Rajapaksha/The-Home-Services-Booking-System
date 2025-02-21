import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../utils/firebase';
import axiosInstance from '../utils/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import postValidator from '../validators/postValidator';
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  
  const [formData, setFormData] = useState({
    userEmail: auth.username,
    title: "",
    description: "",
    contactNo: "",
    category: "",
    location: "",
    whatappLink: "",
    facebookLink: "",
    websiteLink: ""
  });
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        return false;
      }
      return true;
    });

    setImages(validFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const validationErrors = postValidator(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    if (images.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Creating your post...');

    try {
      const storage = getStorage(app);
      const urls = [];

      // Upload images
      for (const image of images) {
        const fileName = `${Date.now()}-${image.name}`;
        const storageRef = ref(storage, `images/${fileName}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
      }

      // Prepare post data
      const postData = {
        ...formData,
        contactNo: [formData.contactNo],
        category: [formData.category],
        images: urls
      };

      // Create post
      const response = await axiosInstance.post('/api/posts', postData);
      toast.dismiss(loadingToast);
      toast.success('Post created successfully!');
      
      // Redirect to the new post
      setTimeout(() => {
        navigate(`/service/${response.data._id}`);
      }, 1500);

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'Error creating post');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <Toaster />
      <div className="max-w-2xl px-4 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
          Create New Service Post
        </h1>

        <form onSubmit={handleUpload} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter service title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your service"
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter contact number"
              />
              {errors.contactNo && <p className="mt-1 text-sm text-red-500">{errors.contactNo}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter location"
              />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter service category"
            />
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">WhatsApp Link</label>
              <input
                type="text"
                name="whatappLink"
                value={formData.whatappLink}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter WhatsApp link"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Facebook Link</label>
              <input
                type="text"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Facebook link"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Website Link</label>
              <input
                type="text"
                name="websiteLink"
                value={formData.websiteLink}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter website link"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Images (Max 5)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">Maximum 5 images, each up to 5MB</p>
          </div>

          {/* Preview Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from(images).map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 text-white transition-colors rounded-md ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Creating Post...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;