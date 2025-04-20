import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiMessageCircle, FiSend, FiHeart, FiEye } from 'react-icons/fi';

// Sample data (mock backend response)
const initialPosts = [
  {
    id: '1',
    title: 'Java Hello World',
    description: 'A simple Hello World program in Java showing the basic structure of a Java class.',
    language: 'java',
    createdAt: '2025-04-15T10:30:00Z',
    likes: 5,
    views: 21,
    tags: ['beginner', 'basics', 'hello-world'],
    comments: [
      { id: 'c1', user: 'Shivain', text: 'Great example for beginners!', createdAt: '2025-04-16T10:00:00Z' },
      { id: 'c2', user: 'Sharma', text: 'Can you explain how HashMaps work?', createdAt: '2025-04-16T11:00:00Z' },
    ],
  },
  {
    id: '2',
    title: 'C++ Vector Example',
    description: 'Example of using vectors in C++ with basic operations like iteration.',
    language: 'cpp',
    createdAt: '2025-04-12T14:20:00Z',
    likes: 12,
    views: 89,
    tags: ['data-structure', 'stl', 'vector'],
    comments: [],
  },
];

// Language colors for badges
const languageColors = {
  java: '#b07219',
  cpp: '#f34b7d',
  c: '#555555',
  python: '#3572A5',
  kotlin: '#A97BFF',
  go: '#00ADD8',
  rust: '#DEA584',
  ruby: '#701516',
  default: '#6e7681',
};

const DiscussionPage = () => {
  const { postId } = useParams(); // Get the post ID from the URL
  const defaultId = postId || '1';
  const [post, setPost] = useState(null); // Current post being viewed
  const [newComment, setNewComment] = useState(''); // New comment input

  // Simulate fetching post data from an API or database
  useEffect(() => {
    // const selectedPost = initialPosts.find((p) => p.id === postId);
    const selectedPost = initialPosts.find((p) => p.id === defaultId);

    if (selectedPost) {
      setPost({ ...selectedPost }); // Copy to avoid direct mutation
    } else {
      console.error('Post not found');
    }
  }, [postId]);

  // Handle submitting a new comment
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now().toString(),
        user: 'You', // Replace with actual logged-in user
        text: newComment,
        createdAt: new Date().toISOString(),
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...(prevPost.comments || []), newCommentObj],
      }));
      setNewComment('');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!post) {
    return <div className="text-xl text-red-500 text-center py-16">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-45 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Discussion
            </span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
            Join the conversation and share your thoughts
          </p>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-8 border-l-blue-600">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h2>
          <p className="text-gray-700 mb-4">{post.description}</p>

          {/* Meta Information */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FiEye className="mr-1" />
            <span>{post.views} views</span>
            <FiHeart className="ml-3 mr-1" />
            <span>{post.likes} likes</span>
            <FiMessageCircle className="ml-3 mr-1" />
            <span>{post.comments.length} comments</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Language Badge */}
          <span
            className="text-xs font-medium px-2.5 py-0.5 rounded"
            style={{
              backgroundColor: languageColors[post.language] || languageColors.default,
              color: ['go', 'cpp'].includes(post.language) ? '#000' : '#fff',
            }}
          >
            {post.language}
          </span>
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Comments ({post.comments.length})</h3>

          {/* Display Comments */}
          <div className="space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-50 rounded-md">
                  <p className="font-medium text-gray-800">{comment.user}</p>
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            )}
          </div>

          {/* Add Comment Form */}
          <div className="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;