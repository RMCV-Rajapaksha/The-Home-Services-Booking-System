// filepath: /C:/Users/ROG/OneDrive/Desktop/Projects/The Home Services Booking System/frontend/src/pages/CreatePost.jsx
import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../utils/firebase'; // Adjust the import path as necessary
import axiosInstance from '../utils/axiosInstance'; // Import the axios instance
import toast, { Toaster } from 'react-hot-toast';
import postValidator from '../validators/postValidator'; // Import the post validator

function CreatePost() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    userEmail: "dummy@example.com",
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
    setImages([...e.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpload = async () => {
    const validationErrors = postValidator(formData);
    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.values(validationErrors).some(error => error)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const storage = getStorage(app);
    const urls = [];

    for (const image of images) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    setImageUrls(urls);
    console.log(urls);

    // Data to be sent to the endpoint
    const postData = {
      ...formData,
      contactNo: [formData.contactNo],
      category: [formData.category],
      images: urls
    };

    // Sending POST request to the endpoint using axios
    try {
      const response = await axiosInstance.post('/api/posts', postData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error uploading post:', error);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <Toaster />
      <form className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        <input
          type="text"
          name="contactNo"
          placeholder="Contact Number"
          value={formData.contactNo}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.contactNo && <p className="text-sm text-red-500">{errors.contactNo}</p>}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
        <input
          type="text"
          name="whatappLink"
          placeholder="WhatsApp Link"
          value={formData.whatappLink}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.whatappLink && <p className="text-sm text-red-500">{errors.whatappLink}</p>}
        <input
          type="text"
          name="facebookLink"
          placeholder="Facebook Link"
          value={formData.facebookLink}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.facebookLink && <p className="text-sm text-red-500">{errors.facebookLink}</p>}
        <input
          type="text"
          name="websiteLink"
          placeholder="Website Link"
          value={formData.websiteLink}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.websiteLink && <p className="text-sm text-red-500">{errors.websiteLink}</p>}
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleUpload}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Upload Images
        </button>
      </form>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            className="object-cover w-full h-32 rounded"
          />
        ))}
      </div>
    </div>
  );
}

export default CreatePost;