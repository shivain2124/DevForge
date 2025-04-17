import React from "react";
import DragDropWrapper from "../components/DragDropWrapper";

const SnippetPage = () => {
  return (
    <div className="min-h-[90vh] w-full px-4 sm:px-8 md:px-16 py-10 flex flex-col items-center bg-gray-900">
      <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-10 text-center">
        All Snippets
      </h1>
      
      <DragDropWrapper />
    </div>
  );
};

export default SnippetPage;
