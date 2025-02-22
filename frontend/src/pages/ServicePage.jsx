import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Facebook, Globe, Calendar, Clock, Share2, Heart, ArrowLeft, MessageSquare } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import Loader from '../components/Loader';

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${id}`);
        setService(response.data);
        toast.success('Service details loaded successfully');
      } catch (error) {
        console.error('Error fetching service:', error);
        toast.error('Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/api/comments/post/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        toast.error('Failed to load comments');
      }
    };

    if (!loading && service) {
      fetchComments();
    }
  }, [id, loading, service]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const loadingToast = toast.loading('Posting comment...');
    setIsPostingComment(true);

    try {
      await axiosInstance.post('/api/comments', {
        postId: id,
        comment: newComment.trim(),
      });

      // Fetch updated comments
      const updatedCommentsResponse = await axiosInstance.get(`/api/comments/post/${id}`);
      setComments(updatedCommentsResponse.data);
      setNewComment('');
      toast.success('Comment posted successfully!', {
        id: loadingToast,
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment', {
        id: loadingToast,
      });
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleImageChange = (direction) => {
    if (!service?.images) return;
    const lastIndex = service.images.length - 1;
    if (direction === 'next') {
      setCurrentImageIndex(currentImageIndex === lastIndex ? 0 : currentImageIndex + 1);
    } else {
      setCurrentImageIndex(currentImageIndex === 0 ? lastIndex : currentImageIndex - 1);
    }
  };

  const toggleLike = async () => {
    try {
      await axiosInstance.post(`/api/posts/${id}/like`);
      setIsLiked(!isLiked);
      toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update favorite status');
    }
  };

  if (loading) {
    return <Loader />;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
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
                <div className="absolute space-x-2 top-4 right-4">
                  <button
                    onClick={toggleLike}
                    className={`p-2 rounded-full ${
                      isLiked ? 'bg-red-500' : 'bg-white/80'
                    } transition-colors hover:bg-red-500`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? 'text-white fill-current' : 'text-gray-700'}`}
                    />
                  </button>
                  <button
                    onClick={() => {
                      navigator.share({
                        title: service.title,
                        url: window.location.href,
                      }).then(() => {
                        toast.success('Shared successfully!');
                      }).catch((error) => {
                        console.error('Error sharing:', error);
                        toast.error('Failed to share');
                      });
                    }}
                    className="p-2 transition-colors rounded-full bg-white/80 hover:bg-tertiary hover:text-white"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Service Content */}
          <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold text-primary">{service.title}</h1>
            <p className="mb-6 text-gray-600">{service.description}</p>

            {/* Service Details */}
            <div className="grid gap-4 mb-8 sm:grid-cols-2">
              {service.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-tertiary" />
                  <span className="text-gray-600">{service.location}</span>
                </div>
              )}
              {service.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-tertiary" />
                  <span className="text-gray-600">{service.phone}</span>
                </div>
              )}
              {service.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-tertiary" />
                  <a href={service.website} className="text-tertiary hover:underline">{service.website}</a>
                </div>
              )}
            </div>
            
            {/* Comments Section */}
            <div className="pt-8 mt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-tertiary" />
                <h2 className="text-xl font-semibold text-primary">Comments</h2>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleAddComment} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment here..."
                  className="w-full p-3 mb-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-tertiary"
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  disabled={isPostingComment || !newComment.trim()}
                  className={`px-4 py-2 text-white rounded-lg transition-all ${
                    isPostingComment || !newComment.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-tertiary hover:bg-secondary-1'
                  }`}
                >
                  {isPostingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="py-6 text-center text-gray-500">Be the first to comment!</p>
                ) : (
                  comments.map((comment, index) => (
                    <div
                      key={comment._id || index}
                      className="p-4 transition-all rounded-lg bg-gray-50 hover:shadow-md"
                    >
                      <p className="text-gray-700">{comment.comment}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;