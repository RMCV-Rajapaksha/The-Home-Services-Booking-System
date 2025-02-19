import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../utils/firebase';
import axiosInstance from '../utils/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import postValidator from '../validators/postValidator';

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
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleUpload = async () => {
    const validationErrors = postValidator(formData);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some(error => error)) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    try {
      const storage = getStorage(app);
      const urls = [];

      for (const image of images) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
      }

      setImageUrls(urls);

      const postData = {
        ...formData,
        contactNo: [formData.contactNo],
        category: [formData.category],
        images: urls
      };

      const response = await axiosInstance.post('/api/posts', postData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error uploading post. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const InputField = ({ name, placeholder, type = "text", textarea = false }) => {
    const baseClasses = "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent transition-all duration-200";
    const errorClasses = errors[name] ? "border-red-500" : "border-gray-200";
    
    return textarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className={`${baseClasses} ${errorClasses} h-32 resize-none`}
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        className={`${baseClasses} ${errorClasses}`}
      />
    );
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Toaster position="top-right" />
        
        <div className="p-8 bg-white shadow-lg rounded-xl">
          <h1 className="mb-8 text-3xl font-bold text-center text-primary">Create New Post</h1>
          
          <form className="space-y-6">
            <div className="space-y-1">
              <InputField name="title" placeholder="Post Title" />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-1">
              <InputField name="description" placeholder="Description" textarea={true} />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <InputField name="contactNo" placeholder="Contact Number" />
                {errors.contactNo && <p className="mt-1 text-sm text-red-500">{errors.contactNo}</p>}
              </div>

              <div className="space-y-1">
                <InputField name="category" placeholder="Category" />
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <InputField name="location" placeholder="Location" />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Social Links</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <InputField name="whatappLink" placeholder="WhatsApp Link" />
                  {errors.whatappLink && <p className="mt-1 text-sm text-red-500">{errors.whatappLink}</p>}
                </div>

                <div className="space-y-1">
                  <InputField name="facebookLink" placeholder="Facebook Link" />
                  {errors.facebookLink && <p className="mt-1 text-sm text-red-500">{errors.facebookLink}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <InputField name="websiteLink" placeholder="Website Link" />
                {errors.websiteLink && <p className="mt-1 text-sm text-red-500">{errors.websiteLink}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="font-medium text-primary">Upload Images</span>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="block w-full px-4 py-3 mt-1 transition-all duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
                />
              </label>

              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
                className={`w-full py-4 px-6 rounded-lg text-white font-medium transition-all duration-200
                  ${isUploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-tertiary hover:bg-secondary-1 active:transform active:scale-95'
                  }`}
              >
                {isUploading ? 'Uploading...' : 'Create Post'}
              </button>
            </div>
          </form>

          {imageUrls.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold text-primary">Uploaded Images</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg aspect-square">
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;