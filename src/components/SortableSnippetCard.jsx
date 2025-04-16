import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableSnippetCard = ({ snippet }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: snippet.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="aspect-square bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col justify-between overflow-hidden"
    >
      <h3 className="text-sm font-semibold text-gray-800">{snippet.title}</h3>
      <pre style={{ backgroundColor: "#002240" }} className="text-gray-100 text-xs p-2 rounded mt-2 overflow-auto h-full">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SortableSnippetCard;
