import React from 'react';
import Editor from '@monaco-editor/react';

const MonacoCompiler = ({ language, code, onCodeChange }) => {
  return (
    <div className="w-full h-[500px] mb-4">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={code}
        theme="vs-dark"
        onChange={(newValue) => onCodeChange(newValue)}
      />
    </div>
  );
};

export default MonacoCompiler;