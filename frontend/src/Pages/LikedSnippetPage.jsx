import React, { useState, useEffect } from 'react';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { snippetService } from '../services/snippet.service';
import ExploreCard from '../components/ExploreCard';
import SnippetModal from '../components/SnippetModal';

const LikedSnippetsPage = () => {
  const navigate = useNavigate();
  const [likedSnippets, setLikedSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  useEffect(() => {
    loadLikedSnippets();
  }, []);

  const loadLikedSnippets = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await snippetService.getLikedSnippets();
      setLikedSnippets(response.snippets || []);
    } catch (error) {
      console.error('Error loading liked snippets:', error);
      setError('Failed to load liked snippets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (snippetId) => {
    try {
      await snippetService.toggleLike(snippetId);
      loadLikedSnippets(); // Refresh the list
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <FiArrowLeft size={20} />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <FiHeart className="text-red-500" size={28} />
            <h1 className="text-3xl font-bold text-gray-900">Liked Snippets</h1>
          </div>
          <p className="text-gray-600">Code snippets you've liked from the community</p>
        </div>

        {/* Content - Reusing existing components */}
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
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={loadLikedSnippets}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : likedSnippets.length === 0 ? (
          <div className="text-center py-16">
            <FiHeart className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No liked snippets yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start exploring and like some amazing code snippets!
            </p>
            <Link
              to="/explore"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Explore Snippets
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {likedSnippets.map((snippet) => (
              <ExploreCard
                key={snippet._id}
                snippet={snippet}
                onView={() => setSelectedSnippet(snippet)}
                onLike={() => handleLike(snippet._id)}
              />
            ))}
          </div>
        )}

        {/* Reuse SnippetModal */}
        {selectedSnippet && (
          <SnippetModal
            snippet={selectedSnippet}
            onClose={() => setSelectedSnippet(null)}
            onLike={() => handleLike(selectedSnippet._id)}
          />
        )}
      </div>
    </div>
  );
};

export default LikedSnippetsPage;
