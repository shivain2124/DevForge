import React from 'react';
import { FiHeart, FiUser, FiCalendar, FiCode, FiEye } from 'react-icons/fi';

const ExploreCard = ({ snippet, onView, onLike }) => {
  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'bg-yellow-100 text-yellow-800',
      python: 'bg-green-100 text-green-800',
      java: 'bg-red-100 text-red-800',
      cpp: 'bg-blue-100 text-blue-800',
      c: 'bg-gray-100 text-gray-800',
      go: 'bg-cyan-100 text-cyan-800',
      rust: 'bg-orange-100 text-orange-800',
      typescript: 'bg-blue-100 text-blue-800',
    };
    return colors[language?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCodePreview = (code) => {
    const lines = code.split('\n').slice(0, 8);
    return lines.join('\n');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
            {snippet.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(snippet.language)}`}>
            {snippet.language}
          </span>
        </div>
        
        {snippet.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {snippet.description}
          </p>
        )}
      </div>

      {/* Code Preview */}
      <div className="px-6 pb-4">
        <div className="bg-gray-900 rounded-lg p-4 relative overflow-hidden">
          <pre className="text-green-400 text-sm font-mono leading-relaxed overflow-hidden">
            <code>{getCodePreview(snippet.code)}</code>
          </pre>
          {snippet.code.split('\n').length > 8 && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent"></div>
          )}
          
          {/* View Full Code Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => window.location.href = `/snippet/${snippet._id}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <FiEye size={16} />
            View Full Code
          </button>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiUser size={14} />
              <span>{snippet.author?.username || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar size={14} />
              <span>{formatDate(snippet.createdAt)}</span>
            </div>
          </div>
          
          <button
            onClick={onLike}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
          >
            <FiHeart size={14} className={snippet.isLiked ? 'fill-current text-red-500' : ''} />
            <span>{snippet.likesCount || 0}</span>
          </button>
        </div>

        {/* Tags */}
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {snippet.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
            {snippet.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-full text-xs">
                +{snippet.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCard;
