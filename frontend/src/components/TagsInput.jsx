import React, { useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';

const TagsInput = ({ tags, onAddTag, onRemoveTag, suggestedTags, theme }) => {
  const [tagInput, setTagInput] = useState('');

  // Define theme-based classes
  const uiClasses = theme === 'dark' 
    ? {
        input: "w-full sm:w-[304px] p-2 bg-gray-800 border border-gray-700 rounded-l text-white",
        button: "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r text-white flex items-center",
        tag: "flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm",
        suggested: "px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-full text-gray-300",
        text: "text-gray-400"
      }
    : {
        input: "w-full sm:w-[304px] p-2 bg-gray-50 border border-gray-300 rounded-l text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
        button: "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r text-white flex items-center",
        tag: "flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm",
        suggested: "px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700",
        text: "text-gray-500"
      };

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      onAddTag(tagInput.trim());
      setTagInput('');
    }
  }, [tagInput, tags, onAddTag]);

  const handleTagInputKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  }, [handleAddTag]);

  const handleSuggestedTagClick = useCallback((tag) => {
    if (!tags.includes(tag)) {
      onAddTag(tag);
    }
  }, [tags, onAddTag]);

  return (
    <div className="mb-4">
      <h2 className={`mb-2 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Tags</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className={uiClasses.tag}
          >
            <span>{tag}</span>
            <button 
              onClick={() => onRemoveTag(tag)} 
              className="ml-2 text-white focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInputKeyDown}
          placeholder="Add tags (press Enter or comma to add)"
          className={uiClasses.input}
        />
        <button
          onClick={handleAddTag}
          className={uiClasses.button}
        >
          <FiPlus className="mr-1" /> Add
        </button>
      </div>
      
      {/* Suggested tags */}
      {suggestedTags && suggestedTags.length > 0 && (
        <div className="mt-3">
          <p className={`text-sm mb-1 ${uiClasses.text}`}>Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.slice(0, 10).map((tag, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedTagClick(tag)}
                className={uiClasses.suggested}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsInput;
