import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiUser, FiCalendar, FiCopy, FiCheck, FiEdit, FiShare2 } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { snippetService } from '../services/snippet.service';
import { useAuth } from '../context/auth.context';

const SnippetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    loadSnippet();
  }, [id]);

  const loadSnippet = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await snippetService.getSnippet(id);
      setSnippet(data);
    } catch (error) {
      console.error('Error loading snippet:', error);
      setError('Snippet not found or you don\'t have permission to view it.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleLike = async () => {
    try {
      await snippetService.toggleLike(id);
      loadSnippet(); // Refresh to get updated like count
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOwner = user && snippet && snippet.author?._id === user.id;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading snippet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Snippet Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <FiArrowLeft size={20} />
            Back
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{snippet.title}</h1>
                {snippet.description && (
                  <p className="text-gray-600 mb-4">{snippet.description}</p>
                )}
                
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FiUser size={16} />
                    <span>By {snippet.author?.username || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar size={16} />
                    <span>{formatDate(snippet.createdAt)}</span>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {snippet.language}
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isOwner && (
                  <Link
                    to={`/compiler?edit=${snippet._id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FiEdit size={16} />
                    Edit
                  </Link>
                )}
                
                <button
                  onClick={handleShareLink}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {linkCopied ? <FiCheck size={16} /> : <FiShare2 size={16} />}
                  {linkCopied ? 'Copied!' : 'Share'}
                </button>
                
                {user && (
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FiHeart size={16} className={snippet.isLiked ? 'fill-current text-red-500' : ''} />
                    <span>{snippet.likesCount || 0}</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Tags */}
            {snippet.tags && snippet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Code Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {snippet.code.split('\n').length} lines
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{snippet.language}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm"
            >
              {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <SyntaxHighlighter
            language={snippet.language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
            showLineNumbers
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailPage;
