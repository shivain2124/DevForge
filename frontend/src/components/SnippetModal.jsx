import React, { useState } from 'react';
import { FiX, FiHeart, FiUser, FiCalendar, FiCopy, FiCheck } from 'react-icons/fi';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetModal = ({ snippet, onClose, onLike }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{snippet.title}</h2>
            {snippet.description && (
              <p className="text-gray-600">{snippet.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Code Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {snippet.language}
                </span>
                <span className="text-gray-500 text-sm">
                  {snippet.code.split('\n').length} lines
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200">
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

          {/* Tags */}
          {snippet.tags && snippet.tags.length > 0 && (
            <div className="px-6 pb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiUser size={16} />
              <span>By {snippet.author?.username || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar size={16} />
              <span>{formatDate(snippet.createdAt)}</span>
            </div>
          </div>
          
          <button
            onClick={onLike}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-white transition-colors"
          >
            <FiHeart size={16} className={snippet.isLiked ? 'fill-current text-red-500' : ''} />
            <span>{snippet.likesCount || 0} likes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;
