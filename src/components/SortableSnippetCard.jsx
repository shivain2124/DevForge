import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "../components/Card";

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
    >      
      <Card title={snippet.title} code={snippet.code} />
    </div>
  );
};

export default SortableSnippetCard;
