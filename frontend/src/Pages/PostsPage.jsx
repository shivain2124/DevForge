import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiHeart, FiEye, FiTag, FiFilter, FiSearch } from 'react-icons/fi';

// Sample posts data (simplified from your snippets)
const initialPosts = [
  { 
    id: '1', 
    title: 'Java Hello World', 
    description: 'A simple Hello World program in Java showing the basic structure of a Java class.',
    language: 'java', 
    createdAt: '2023-04-15T10:30:00Z',
    likes: 5,
    views: 42,
    tags: ['beginner', 'basics', 'hello-world']
  },
  { 
    id: '2', 
    title: 'C++ Vector Example', 
    description: 'Example of using vectors in C++ with basic operations like iteration.',
    language: 'cpp', 
    createdAt: '2023-04-12T14:20:00Z',
    likes: 12,
    views: 89,
    tags: ['data-structure', 'stl', 'vector']
  },
  { 
    id: '3', 
    title: 'Python List Comprehension', 
    description: 'How to use list comprehensions in Python for more concise and readable code.',
    language: 'python', 
    createdAt: '2023-04-10T09:15:00Z',
    likes: 8,
    views: 65,
    tags: ['list', 'comprehension', 'functional']
  },
  { 
    id: '4', 
    title: 'C Memory Allocation', 
    description: 'Guide to dynamic memory allocation in C using malloc and free.',
    language: 'c', 
    createdAt: '2023-04-05T16:45:00Z',
    likes: 3,
    views: 31,
    tags: ['memory', 'pointers', 'allocation']
  },
  { 
    id: '5', 
    title: 'Kotlin Extension Function', 
    description: 'How to create and use extension functions in Kotlin to extend existing classes.',
    language: 'kotlin', 
    createdAt: '2023-04-02T11:30:00Z',
    likes: 15,
    views: 102,
    tags: ['extension', 'functional', 'string']
  },
  { 
    id: '6', 
    title: 'Go Goroutine', 
    description: 'Introduction to goroutines in Go for concurrent programming.',
    language: 'go', 
    createdAt: '2023-03-28T13:20:00Z',
    likes: 7,
    views: 54,
    tags: ['concurrency', 'goroutine', 'parallel']
  },
  { 
    id: '7', 
    title: 'Rust Ownership Example', 
    description: 'Understanding Rust\'s ownership system with practical examples.',
    language: 'rust', 
    createdAt: '2023-03-25T10:10:00Z',
    likes: 9,
    views: 76,
    tags: ['ownership', 'memory-safety', 'borrowing']
  },
  { 
    id: '8', 
    title: 'Ruby Block Syntax', 
    description: 'Different ways to use blocks in Ruby with examples.',
    language: 'ruby', 
    createdAt: '2023-03-20T15:45:00Z',
    likes: 6,
    views: 48,
    tags: ['blocks', 'iteration', 'functional']
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
  default: '#6e7681'
};

const PostsPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'likes', 'views'
  
  // Get unique languages for filter
  const languages = ['all', ...new Set(posts.map(post => post.language))];
  
  // Get all unique tags
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];
  
  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || post.language === selectedLanguage;
      const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
      
      return matchesSearch && matchesLanguage && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'likes') {
        return b.likes - a.likes;
      } else if (sortBy === 'views') {
        return b.views - a.views;
      }
      return 0;
    });
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Handle search change
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  
  // Handle language change
  const handleLanguageChange = useCallback((e) => {
    setSelectedLanguage(e.target.value);
  }, []);
  
  // Handle tag selection
  const handleTagClick = useCallback((tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
  }, [selectedTag]);
  
  // Handle sort change
  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedLanguage('all');
    setSelectedTag('');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              My Posts
            </span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
            Browse your collection of code snippets and tutorials
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            {/* Language Filter */}
            <div className="relative md:w-48">
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
            
            {/* Sort By */}
            <div className="relative md:w-48">
              <select
                className="block w-full px-3 py-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="date">Most Recent</option>
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
          
          {/* Tags */}
          <div>
            <div className="flex items-center mb-2">
              <FiTag className="h-4 w-4 text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Popular Tags</h3>
              
              {(searchQuery || selectedLanguage !== 'all' || selectedTag) && (
                <button 
                  onClick={clearFilters}
                  className="ml-auto text-sm text-blue-500 hover:text-blue-700"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedTag === tag 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Link 
                to={`/snippets/${post.id}`} 
                key={post.id}
                className="block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                      <p className="text-gray-600 mb-4">{post.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                            onClick={(e) => {
                              e.preventDefault();
                              handleTagClick(tag);
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Language Badge */}
                    <span 
                      className="text-xs font-medium px-2.5 py-0.5 rounded" 
                      style={{ 
                        backgroundColor: languageColors[post.language] || languageColors.default,
                        color: ['go', 'cpp'].includes(post.language) ? '#000' : '#fff'
                      }}
                    >
                      {post.language}
                    </span>
                  </div>
                  
                  {/* Post Meta */}
                  <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <FiClock className="mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <FiHeart className="mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <FiEye className="mr-1" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No posts found</h3>
              <p className="mt-2 text-gray-500 max-w-md mx-auto">
                {searchQuery || selectedLanguage !== 'all' || selectedTag
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Create your first post to get started.'}
              </p>
              <button className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all">
                Create New Post
              </button>
            </div>
          )}
        </div>
        
        {/* Pagination (if needed) */}
        {filteredPosts.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
              <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
