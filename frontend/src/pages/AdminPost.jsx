import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Plus,
  Trash2,
  Edit2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { Toaster, toast } from 'react-hot-toast';

import { useAuth } from "../components/context/AuthContext";

const AdminPost = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const { auth } = useAuth();
  
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
   
      const response = await axios.get(`/api/posts/user/${auth.username}`);
    
      setPosts(response.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header Section */}
    

      {/* Content Section */}
      <div className="p-6 mx-auto max-w-7xl">
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-64"
            >
              <div className="w-12 h-12 border-b-2 rounded-full animate-spin border-primary"></div>
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
              <p className="mt-4 text-lg text-gray-600">No posts found</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-white rounded-lg shadow-md"
                >
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-semibold text-primary">{post.title}</h2>
                    <p className="mb-4 text-secondary line-clamp-3">{post.description}</p>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => navigate(`/edit-post/${post.id}`)}
                        className="flex items-center gap-2 px-4 py-2 transition-colors duration-200 border rounded-lg border-tertiary text-tertiary hover:bg-tertiary hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPost;