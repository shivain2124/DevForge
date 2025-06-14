import React, { useState, useCallback, useEffect } from 'react';
import { FiHeart, FiCode, FiCopy, FiEdit, FiTrash2, FiSearch, FiFilter, FiTag, FiX, FiMessageCircle } from 'react-icons/fi';
import TagsInput from '../components/TagsInput';
import { useParams, Link } from 'react-router-dom';
import { snippetService } from '../services/snippet.service';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

// Language color mapping with vibrant colors
const languageColors = {
  java: '#b07219',
  cpp: '#f34b7d',
  c: '#555555',
  python: '#3572A5',
  kotlin: '#A97BFF',
  go: '#00ADD8',
  rust: '#DEA584',
  ruby: '#701516',
  default: '#6e7681'
};

// Language background colors for cards
const languageBackgrounds = {
  java: 'bg-amber-50',
  cpp: 'bg-pink-50',
  c: 'bg-gray-50',
  python: 'bg-blue-50',
  kotlin: 'bg-purple-50',
  go: 'bg-cyan-50',
  rust: 'bg-orange-50',
  ruby: 'bg-red-50',
  default: 'bg-gray-50'
};

// Snippet Card Component
const SnippetCard = ({ snippet, onLike, onCopy, onEdit, onDelete, onTagClick }) => {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${languageBackgrounds[snippet.language] || languageBackgrounds.default}`}>
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-800 truncate pr-4">{snippet.title}</h3>
          <div className="flex items-center">
            <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded" 
                  style={{ 
                    backgroundColor: languageColors[snippet.language] || languageColors.default,
                    color: ['go', 'cpp'].includes(snippet.language) ? '#000' : '#fff'
                  }}>
              {snippet.language}
            </span>
          </div>
        </div>
      </div>
      
      {/* Code Preview - Using flex-grow to push footer to bottom */}
      <div className="p-4 overflow-hidden flex-grow">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-hidden" style={{ maxHeight: '150px' }}>
          <code>{snippet.code}</code>
        </pre>
      </div>
      
      {/* Tags Section */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {snippet.tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => onTagClick(tag)}
                className="px-2 py-0.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Card Footer - Will always be at the bottom */}
      <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center mt-auto">
        <button 
          onClick={() => onLike(snippet._id)} 
          className="flex items-center gap-1 text-gray-600 hover:text-pink-500 transition-colors"
        >
          <FiHeart size={16} className={snippet.likesCount > 0 ? "fill-pink-500 text-pink-500" : ""} />
          <span className={`text-xs ${snippet.likesCount > 0 ? "text-pink-500 font-medium" : ""}`}>{snippet.likesCount || 0}</span>
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onCopy(snippet.code)} 
            className="p-1.5 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all"
            title="Copy code"
          >
            <FiCopy size={16} />
          </button>
          <button 
            onClick={() => onEdit(snippet._id)} 
            className="p-1.5 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-full transition-all"
            title="Edit snippet"
          >
            <FiEdit size={16} />
          </button>
          <button 
            onClick={() => onDelete(snippet._id)} 
            className="p-1.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Delete snippet"
          >
            <FiTrash2 size={16} />
          </button>
          <Link 
            to={`/snippet/${snippet._id}`} 
            className="p-1.5 text-gray-600 hover:text-purple-500 hover:bg-purple-50 rounded-full transition-all"
            title="View Discussion"
          >
            <FiMessageCircle size={16}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main SnippetPage Component
const SnippetPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load snippets on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    loadSnippets();
  }, [isAuthenticated, navigate]);

  // Load snippets from API
  const loadSnippets = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await snippetService.getAllSnippets();
      setSnippets(data.snippets || []);
    } catch (error) {
      console.error('Error loading snippets:', error);
      setError('Failed to load snippets. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Get all unique tags from snippets
  const allTags = [...new Set(snippets.flatMap(snippet => snippet.tags || []))];
  
  // Filter snippets based on search query, selected language, and selected tags
  const filteredSnippets = snippets.filter(snippet => {
    // Search query filter
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          snippet.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Language filter
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.every(tag => snippet.tags && snippet.tags.includes(tag));
    
    return matchesSearch && matchesLanguage && matchesTags;
  });
  
  // Get unique languages for filter
  const languages = ['all', ...new Set(snippets.map(snippet => snippet.language))];
  
  // Event handlers
  const handleLike = useCallback(async (id) => {
    try {
      await snippetService.toggleLike(id);
      // Reload snippets to get updated like count
      loadSnippets();
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to update like. Please try again.');
    }
  }, []);
  
  const handleCopy = useCallback((code) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  }, []);
  
  const handleEdit = useCallback((id) => {
    // Navigate to compiler with edit parameter
    navigate(`/compiler?edit=${id}`);
  }, [navigate]);
  
  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        await snippetService.deleteSnippet(id);
        // Remove from local state
        setSnippets(prevSnippets => prevSnippets.filter(snippet => snippet._id !== id));
        alert('Snippet deleted successfully');
      } catch (error) {
        console.error('Error deleting snippet:', error);
        alert('Failed to delete snippet. Please try again.');
      }
    }
  }, []);
  
  // Tag handlers
  const handleAddTag = useCallback((tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prevTags => [...prevTags, tag]);
    }
  }, [selectedTags]);
  
  const handleRemoveTag = useCallback((tag) => {
    setSelectedTags(prevTags => prevTags.filter(t => t !== tag));
  }, []);
  
  const handleTagClick = useCallback((tag) => {
    if (!selectedTags.includes(tag)) {
      handleAddTag(tag);
    }
  }, [selectedTags, handleAddTag]);
  
  // Search handler
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  
  // Language filter handler
  const handleLanguageChange = useCallback((e) => {
    setSelectedLanguage(e.target.value);
  }, []);
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedLanguage('all');
    setSelectedTags([]);
  }, []);

  // Create new snippet handler
  const handleCreateNewSnippet = useCallback(() => {
    navigate('/compiler');
  }, [navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your snippets...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiCode className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Error Loading Snippets</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={loadSnippets}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient text */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              My Code Snippets
            </span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
            Your personal collection of code snippets for quick reference
          </p>
        </div>
        
        {/* Search and Filters with enhanced styling */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="text"
              placeholder="Search snippets..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="relative sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="h-4 w-4 text-blue-500" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Tag Filter Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <FiTag className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Filter by Tags</h2>
            
            {selectedTags.length > 0 && (
              <button 
                onClick={clearAllFilters}
                className="ml-auto text-sm text-blue-500 hover:text-blue-700"
              >
                Clear all filters
              </button>
            )}
          </div>
          
          {/* Selected Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedTags.map((tag, index) => (
              <div 
                key={index} 
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                <span>#{tag}</span>
                <button 
                  onClick={() => handleRemoveTag(tag)} 
                  className="ml-2 text-blue-800 hover:text-blue-900 focus:outline-none"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
          
          {/* Tag Input */}
          <TagsInput 
            tags={selectedTags}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            suggestedTags={allTags.filter(tag => !selectedTags.includes(tag))}
          />
        </div>
        
        {/* Stats bar */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">Total Snippets</p>
            <p className="text-2xl font-bold text-blue-600">{snippets.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Languages</p>
            <p className="text-2xl font-bold text-green-600">{new Set(snippets.map(s => s.language)).size}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <p className="text-sm text-gray-500">Most Used</p>
            <p className="text-2xl font-bold text-purple-600">
              {languages.filter(l => l !== 'all').sort((a, b) => 
                snippets.filter(s => s.language === b).length - 
                snippets.filter(s => s.language === a).length
              )[0] || 'None'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-pink-500">
            <p className="text-sm text-gray-500">Total Likes</p>
            <p className="text-2xl font-bold text-pink-600">
              {snippets.reduce((sum, snippet) => sum + (snippet.likesCount || 0), 0)}
            </p>
          </div>
        </div>
        
        {/* Filter Status */}
        {(searchQuery || selectedLanguage !== 'all' || selectedTags.length > 0) && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-lg">
            <div className="flex items-center">
              <FiFilter className="mr-2" />
              <span className="font-medium">Active filters:</span>
              {searchQuery && <span className="ml-2">Search: "{searchQuery}"</span>}
              {selectedLanguage !== 'all' && <span className="ml-2">Language: {selectedLanguage}</span>}
              {selectedTags.length > 0 && <span className="ml-2">Tags: {selectedTags.join(', ')}</span>}
              <button 
                onClick={clearAllFilters}
                className="ml-auto text-sm text-blue-700 hover:text-blue-900"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
        
        {/* Snippets Grid */}
        {filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map(snippet => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                onLike={handleLike}
                onCopy={handleCopy}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FiCode className="mx-auto h-16 w-16 text-blue-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">No snippets found</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {searchQuery || selectedLanguage !== 'all' || selectedTags.length > 0
                ? 'Try adjusting your search or filter criteria.' 
                : 'Create your first snippet to get started.'}
            </p>
            <button 
              onClick={handleCreateNewSnippet}
              className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Create New Snippet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnippetPage;
