import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableSnippetCard from "./SortableSnippetCard";

const initialSnippets = [
  { id: "1", title: "Snippet 1", code: "console.log('Hello World');" },
  { id: "2", title: "Snippet 2", code: "const x = 10;" },
  { id: "3", title: "Snippet 3", code: "function add(a, b) { return a + b; }" },
  { id: "4", title: "Snippet 4", code: "let y = 5 * 3;" },
  { id: "5", title: "Snippet 5", code: "alert('Boom');" },
  { id: "6", title: "Snippet 6", code: "const items = [1, 2, 3];" },
  { id: "7", title: "Snippet 7", code: "Math.max(1, 5, 3);" },
  { id: "8", title: "Snippet 8", code: "setTimeout(() => {}, 1000);" },
  { id: "9", title: "Snippet 9", code: "document.querySelector('div');" },
];

const DragDropWrapper = () => {
  const [snippets, setSnippets] = useState(initialSnippets);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSnippets((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id);
        const newIndex = prev.findIndex((s) => s.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen w-full p-4 bg-gray-800">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={snippets.map((s) => s.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
            {snippets.map((snippet) => (
              <SortableSnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragDropWrapper;
