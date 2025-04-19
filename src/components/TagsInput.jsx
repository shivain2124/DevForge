import React, { useState, useCallback } from 'react';
import { FiPlus } from 'react-icons/fi';

const TagsInput = ({ tags, onAddTag, onRemoveTag, suggestedTags }) => {
  const [tagInput, setTagInput] = useState('');

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
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
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
          className="w-full sm:w-[308px] p-2 bg-white border border-gray-300 rounded-l text-gray-700"
        />
        {/* <button
          onClick={handleAddTag}
          className="ml-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center"
        >
          <FiPlus className="mr-1" /> Add
        </button> */}
      </div>
      
      {/* Suggested tags */}
      {suggestedTags && suggestedTags.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-1">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.slice(0, 10).map((tag, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedTagClick(tag)}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
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
