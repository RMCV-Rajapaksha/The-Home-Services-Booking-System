import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { Toaster, toast } from 'react-hot-toast';

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

  useEffect(() => {
    fetchPost();
  }, []);

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
                <p>{post.images || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Edit Details</h2>
            <form onSubmit={handleSubmit}>
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
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
                <input
                  type="text"
                  name="images"
                  value={post.images}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Update Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;