import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { Toaster, toast } from 'react-hot-toast';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../utils/firebase';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    userEmail: '',
    title: '',
    description: '',
    contactNo: '',
    category: '',
    location: '',
    whatappLink: '',
    facebookLink: '',
    websiteLink: '',
    images: ''
  });
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage(app);

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (post.images) {
      const urls = typeof post.images === 'string' ? post.images.split(',') : post.images;
      setImageUrls(urls.filter(url => url));
    }
  }, [post.images]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to fetch post. Please try again later.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `posts/${id}/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      });

      const newUrls = await Promise.all(uploadPromises);
      const updatedUrls = [...imageUrls, ...newUrls];
      setImageUrls(updatedUrls);
      setPost(prev => ({
        ...prev,
        images: updatedUrls.join(',')
      }));
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (urlToRemove, index) => {
    try {
      // Extract filename from URL
      const filename = urlToRemove.split('/').pop().split('?')[0];
      const imageRef = ref(storage, `posts/${id}/${filename}`);
      
      await deleteObject(imageRef);
      const updatedUrls = imageUrls.filter(url => url !== urlToRemove);
      setImageUrls(updatedUrls);
      setPost(prev => ({
        ...prev,
        images: updatedUrls.join(',')
      }));
      toast.success('Image removed successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to remove image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatePromise = axios.put(`/api/posts/${id}`, post);

    toast.promise(updatePromise, {
      loading: 'Updating post...',
      success: 'Post updated successfully',
      error: 'Failed to update post'
    });

    try {
      await updatePromise;
      navigate('/admin-post');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="p-6 mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-semibold text-primary">Edit Post</h1>
        <div className="grid grid-cols-2 gap-8">
          {/* Current Post Preview */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Current Post</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Title</h3>
                <p>{post.title}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Description</h3>
                <p>{post.description}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Contact No</h3>
                <p>{post.contactNo}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Location</h3>
                <p>{post.location}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">WhatsApp Link</h3>
                <p>{post.whatappLink || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Facebook Link</h3>
                <p>{post.facebookLink || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Website Link</h3>
                <p>{post.websiteLink || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Images</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Post image ${index + 1}`}
                        className="object-cover w-full h-48 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Edit Details</h2>
            <form onSubmit={handleSubmit}>
              {/* Existing form fields */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={post.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Contact No</label>
                <input
                  type="text"
                  name="contactNo"
                  value={post.contactNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={post.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">WhatsApp Link</label>
                <input
                  type="text"
                  name="whatappLink"
                  value={post.whatappLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Facebook Link</label>
                <input
                  type="text"
                  name="facebookLink"
                  value={post.facebookLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Website Link</label>
                <input
                  type="text"
                  name="websiteLink"
                  value={post.websiteLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* Image Upload Section */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded-lg"
                  disabled={uploading}
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Post image ${index + 1}`}
                        className="object-cover w-full h-48 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url, index)}
                        className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Update Post'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;