// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import Card from "../components/Card";

// const SortableSnippetCard = ({ snippet }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: snippet.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//     >      
//       <Card title={snippet.title} code={snippet.code} />
//     </div>
//   );
// };

// export default SortableSnippetCard;
// import React from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import Card from "../components/Card";
// import { FiHeart } from "react-icons/fi"; // Smaller icon import

// const SortableSnippetCard = ({ snippet, onLike }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: snippet.id });

//   const handleLike = (e) => {
//     e.stopPropagation();
//     onLike(snippet.id);
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition
//       }}
//       {...attributes}
//       {...listeners}
//       className="relative"
//     >      
//       <Card title={snippet.title} code={snippet.code} />
//       <button
//         onClick={handleLike}
//         className="absolute bottom-2 right-2 flex items-center gap-1 bg-blue-600/80 hover:bg-blue-700 px-2 py-1 rounded text-xs text-white"
//       >
//         <FiHeart /> {snippet.likes || 0}
//       </button>
//     </div>
//   );
// };

// export default SortableSnippetCard;

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { FiHeart } from "react-icons/fi";

const SortableSnippetCard = ({ snippet, onLike }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: snippet.id });

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(snippet.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative' // Important for absolute positioning
      }}
      {...attributes}
      {...listeners}
    >      
      <Card title={snippet.title} code={snippet.code} />
      <button
        onClick={handleLike}
        className="absolute bottom-4 right-4 flex items-center gap-1 bg-blue-600/80 hover:bg-blue-700 px-2 py-1 rounded text-xs text-white"
        style={{
          zIndex: 10 // Ensure button is above card
        }}
      >
        <FiHeart /> {snippet.likes || 0}
      </button>
    </div>
  );
};

export default SortableSnippetCard;
