import React, { useState, useEffect } from 'react';
import { FiSend, FiMessageCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import { commentService } from '../services/comment.service';
import { useAuth } from '../context/auth.context';

const Comments = ({ snippetId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [snippetId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await commentService.getCommentsForSnippet(snippetId);
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;

    try {
      setSubmitting(true);
      const commentData = {
        text: newComment.trim()
      };

       console.log('Sending comment data:', commentData); // Debug line
    console.log('To snippet ID:', snippetId); // Debug line
    
      await commentService.addCommentToSnippet(snippetId, commentData);
      setNewComment('');
      loadComments(); // Refresh comments
    } catch (error) {
      console.error('Error adding comment:', error);
      console.error('Comment error details:', error.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiMessageCircle size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mb-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {comment.author?.username?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {comment.author?.username || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 ml-10">{comment.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FiMessageCircle className="mx-auto text-4xl text-gray-300 mb-2" />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      {user ? (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">Press Enter to submit</p>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || submitting}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiSend size={14} />
                  {submitting ? 'Posting...' : 'Comment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-gray-500">
            Please <span className="text-blue-600 font-medium">sign in</span> to leave a comment
          </p>
        </div>
      )}
    </div>
  );
};

export default Comments;
