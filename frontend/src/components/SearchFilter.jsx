import React from 'react';
import { FiX, FiCode } from 'react-icons/fi';

const SearchFilters = ({ 
  snippets, 
  selectedLanguage, 
  onLanguageChange, 
  showFilters, 
  onClose 
}) => {
  const getLanguageCounts = () => {
    const counts = {};
    snippets.forEach(snippet => {
      const lang = snippet.language;
      counts[lang] = (counts[lang] || 0) + 1;
    });
    return counts;
  };

  const languageCounts = getLanguageCounts();
  const languages = Object.keys(languageCounts).sort();

  return (
    <>
      {/* Mobile Overlay */}
      {showFilters && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 z-40 h-full lg:h-auto
        w-80 lg:w-64 bg-white lg:bg-transparent
        transform transition-transform duration-300 ease-in-out
        ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto p-6 lg:p-0
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Languages Filter */}
        <div className="bg-white lg:bg-gray-50 rounded-xl p-6 lg:p-4 shadow-sm lg:shadow-none border lg:border-0">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiCode size={18} />
            Languages
          </h3>
          
          <div className="space-y-2">
            <button
              onClick={() => onLanguageChange('')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !selectedLanguage 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>All Languages</span>
                <span className="text-sm text-gray-500">{snippets.length}</span>
              </div>
            </button>
            
            {languages.map(language => (
              <button
                key={language}
                onClick={() => onLanguageChange(language)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedLanguage === language
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize">{language}</span>
                  <span className="text-sm text-gray-500">{languageCounts[language]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilters;
