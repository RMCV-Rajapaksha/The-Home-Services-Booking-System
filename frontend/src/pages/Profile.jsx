import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../components/context/AuthContext';
import axios from '../utils/axiosInstance';

function Profile() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (auth?.username) {
      setFormData(prev => ({
        ...prev,
        username: auth.username
      }));
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    const updatePromise = axios.post('http://localhost:8080/update', {
      username: formData.username,
      password: formData.password
    });

    toast.promise(
      updatePromise,
      {
        loading: 'Updating profile...',
        success: 'Profile updated successfully!',
        error: (err) => err.response?.data?.message || 'Failed to update profile'
      }
    );

    try {
      setLoading(true);
      await updatePromise;
      // Reset password fields after successful update
      setFormData(prev => ({
        ...prev,
        password: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-md p-8 mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-primary">Profile Settings</h2>
            <p className="mt-2 text-sm text-gray-600">Update your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Confirm new password"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;