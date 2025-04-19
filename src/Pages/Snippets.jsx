import React, { useState } from 'react';
import { FiHeart, FiCode, FiCopy, FiEdit, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';

// Sample data with the requested languages
const initialSnippets = [
  { id: '1', title: 'Java Hello World', language: 'java', code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}', likes: 5 },
  { id: '2', title: 'C++ Vector Example', language: 'cpp', code: '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> numbers = {1, 2, 3, 4, 5};\n    for(int num : numbers) {\n        std::cout << num << " ";\n    }\n    return 0;\n}', likes: 12 },
  { id: '3', title: 'Python List Comprehension', language: 'python', code: 'numbers = [1, 2, 3, 4, 5]\nsquared = [x**2 for x in numbers]\nprint(squared)  # [1, 4, 9, 16, 25]', likes: 8 },
  { id: '4', title: 'C Memory Allocation', language: 'c', code: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int*)malloc(5 * sizeof(int));\n    for(int i = 0; i < 5; i++) {\n        arr[i] = i + 1;\n    }\n    free(arr);\n    return 0;\n}', likes: 3 },
  { id: '5', title: 'Kotlin Extension Function', language: 'kotlin', code: 'fun String.addExclamation(): String {\n    return this + "!"\n}\n\nfun main() {\n    val message = "Hello"\n    println(message.addExclamation())  // Hello!\n}', likes: 15 },
  { id: '6', title: 'Go Goroutine', language: 'go', code: 'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc say(s string) {\n    for i := 0; i < 5; i++ {\n        time.Sleep(100 * time.Millisecond)\n        fmt.Println(s)\n    }\n}\n\nfunc main() {\n    go say("world")\n    say("hello")\n}', likes: 7 },
  { id: '7', title: 'Rust Ownership Example', language: 'rust', code: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;  // s1 is moved to s2\n    \n    // This would cause an error:\n    // println!("{}", s1);\n    \n    println!("{}", s2);  // Works fine\n}', likes: 9 },
  { id: '8', title: 'Ruby Block Syntax', language: 'ruby', code: '# Using a block with each\nnumbers = [1, 2, 3, 4, 5]\n\nnumbers.each do |num|\n  puts num * 2\nend\n\n# One-line version\nnumbers.each { |num| puts num * 2 }', likes: 6 },
];

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

const SnippetCard = ({ snippet, onLike, onCopy, onEdit, onDelete }) => {
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
      
      {/* Card Footer - Will always be at the bottom */}
      <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center mt-auto">
        <button 
          onClick={() => onLike(snippet.id)} 
          className="flex items-center gap-1 text-gray-600 hover:text-pink-500 transition-colors"
        >
          <FiHeart size={16} className={snippet.likes > 0 ? "fill-pink-500 text-pink-500" : ""} />
          <span className={`text-xs ${snippet.likes > 0 ? "text-pink-500 font-medium" : ""}`}>{snippet.likes}</span>
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
            onClick={() => onEdit(snippet.id)} 
            className="p-1.5 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-full transition-all"
            title="Edit snippet"
          >
            <FiEdit size={16} />
          </button>
          <button 
            onClick={() => onDelete(snippet.id)} 
            className="p-1.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Delete snippet"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const SnippetPage = () => {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  
  // Filter snippets based on search query and selected language
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          snippet.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });
  
  // Get unique languages for filter
  const languages = ['all', ...new Set(snippets.map(snippet => snippet.language))];
  
  // Event handlers
  const handleLike = (id) => {
    setSnippets(snippets.map(snippet => 
      snippet.id === id ? { ...snippet, likes: snippet.likes + 1 } : snippet
    ));
  };
  
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };
  
  const handleEdit = (id) => {
    // Navigate to edit page or open modal
    console.log('Edit snippet:', id);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      setSnippets(snippets.filter(snippet => snippet.id !== id));
    }
  };

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
        <div className="mb-10 flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="text"
              placeholder="Search snippets..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFilter className="h-4 w-4 text-blue-500" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
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
              {snippets.reduce((sum, snippet) => sum + snippet.likes, 0)}
            </p>
          </div>
        </div>
        
        {/* Snippets Grid */}
        {filteredSnippets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map(snippet => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onLike={handleLike}
                onCopy={handleCopy}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FiCode className="mx-auto h-16 w-16 text-blue-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-900">No snippets found</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              {searchQuery || selectedLanguage !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Create your first snippet to get started.'}
            </p>
            <button className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all">
              Create New Snippet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnippetPage;
