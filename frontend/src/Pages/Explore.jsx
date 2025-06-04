import React, { useState, useEffect } from 'react';
import { FiSearch, FiCode, FiUsers, FiHeart, FiFilter } from 'react-icons/fi';
import ExploreCard from '../components/ExploreCard';
import SnippetModal from '../components/SnippetModal';
import SearchFilters from '../components/SearchFilter';
import { snippetService } from '../services/snippet.service';
import { CountingNumber } from '@/components/animate-ui/text/counting-number';

const ExplorePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({ total: 0, languages: 0, authors: 0 });

  useEffect(() => {
    loadPublicSnippets();
  }, []);

  useEffect(() => {
    filterSnippets();
  }, [snippets, searchTerm, selectedLanguage]);

  const loadPublicSnippets = async () => {
    try {
      setLoading(true);
      const data = await snippetService.getPublicSnippets();
      setSnippets(data || []);
      
      // Calculate stats
      const uniqueLanguages = [...new Set(data.map(s => s.language))];
      const uniqueAuthors = [...new Set(data.map(s => s.author?.username))];
      setStats({
        total: data.length,
        languages: uniqueLanguages.length,
        authors: uniqueAuthors.length
      });
    } catch (error) {
      console.error('Error loading public snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSnippets = () => {
    let filtered = snippets;

    if (searchTerm) {
      filtered = filtered.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedLanguage) {
      filtered = filtered.filter(snippet => snippet.language === selectedLanguage);
    }

    setFilteredSnippets(filtered);
  };

  const handleLike = async (snippetId) => {
    try {
      await snippetService.toggleLike(snippetId);
      loadPublicSnippets(); // Refresh to get updated like counts
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Code Snippets
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover amazing code snippets shared by the DevForge community
            </p>
            
            {/* Animated Stats */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 mb-8">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[120px]">
                <FiCode className="mx-auto text-2xl mb-2 text-blue-200" />
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {loading ? (
                    <div className="animate-pulse bg-white/20 h-8 w-12 mx-auto rounded"></div>
                  ) : (
                    <CountingNumber 
                      number={stats.total} 
                      className="text-white"
                      duration={2000}
                    />
                  )}
                </div>
                <div className="text-blue-200 text-sm font-medium">Snippets</div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[120px]">
                <svg className="mx-auto text-2xl mb-2 text-blue-200 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {loading ? (
                    <div className="animate-pulse bg-white/20 h-8 w-12 mx-auto rounded"></div>
                  ) : (
                    <CountingNumber 
                      number={stats.languages} 
                      className="text-white"
                      duration={2200}
                    />
                  )}
                </div>
                <div className="text-blue-200 text-sm font-medium">Languages</div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[120px]">
                <FiUsers className="mx-auto text-2xl mb-2 text-blue-200" />
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {loading ? (
                    <div className="animate-pulse bg-white/20 h-8 w-12 mx-auto rounded"></div>
                  ) : (
                    <CountingNumber 
                      number={stats.authors} 
                      className="text-white"
                      duration={2400}
                    />
                  )}
                </div>
                <div className="text-blue-200 text-sm font-medium">Contributors</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search snippets, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-20"
          >
            <FiFilter size={20} />
          </button>

          {/* Filters Sidebar */}
          <SearchFilters
            snippets={snippets}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            showFilters={showFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Snippets Grid */}
          <div className="flex-1">
            {/* Results Counter */}
            <div className="mb-6 flex items-center justify-between">
              <div className="text-gray-600">
                Showing{' '}
                <span className="font-semibold">
                  <CountingNumber 
                    number={filteredSnippets.length} 
                    className="text-blue-600"
                    duration={800}
                  />
                </span>{' '}
                of{' '}
                <span className="font-semibold">
                  <CountingNumber 
                    number={stats.total} 
                    className="text-blue-600"
                    duration={800}
                  />
                </span>{' '}
                snippets
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredSnippets.length === 0 ? (
              <div className="text-center py-16">
                <FiCode className="mx-auto text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No snippets found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSnippets.map((snippet) => (
                  <ExploreCard
                    key={snippet._id}
                    snippet={snippet}
                    onView={() => setSelectedSnippet(snippet)}
                    onLike={() => handleLike(snippet._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Snippet Modal */}
      {selectedSnippet && (
        <SnippetModal
          snippet={selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
          onLike={() => handleLike(selectedSnippet._id)}
        />
      )}
    </div>
  );
};

export default ExplorePage;
