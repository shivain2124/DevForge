// import React from "react";
// import DragDropWrapper from "../components/DragDropWrapper";

// const SnippetPage = () => {
//   return (
//     <div className="min-h-[90vh] w-full px-4 sm:px-8 md:px-16 py-10 flex flex-col items-center bg-gray-900">
//       <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-10 text-center">
//         All Snippets
//       </h1>
      
//       <DragDropWrapper />
//     </div>
//   );
// };

// export default SnippetPage;
import React, { useState } from "react";
import DragDropWrapper from "../components/DragDropWrapper";
import Sidebar from "../components/Sidebar";

const SnippetPage = () => {
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-[90vh] w-full flex flex-col md:flex-row bg-gray-900">
      {/* Sidebar */}
      <Sidebar onFilterChange={setFilter} />
      
      {/* Main content */}
      <div className="flex-1 px-4 py-6 md:px-8 md:py-10">
        <h1 className="font-bold text-3xl md:text-4xl text-white mb-6 md:mb-10">
          {filter === "all" ? "All Snippets" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Snippets`}
        </h1>
        
        <DragDropWrapper />
      </div>
    </div>
  );
};

export default SnippetPage;
