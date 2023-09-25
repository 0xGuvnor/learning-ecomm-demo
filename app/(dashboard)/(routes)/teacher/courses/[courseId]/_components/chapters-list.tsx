"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
}

const ChaptersList = ({ onEdit, onReorder, items }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(chapters);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = newItems.slice(startIndex, endIndex + 1);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: newItems.findIndex((item) => item.id === chapter.id),
    }));

    setChapters(newItems);
    onReorder(bulkUpdateData);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) return null;
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="chapters">
        {({ droppableProps, innerRef, placeholder }) => (
          <div {...droppableProps} ref={innerRef} className="space-y-4">
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                index={index}
                draggableId={chapter.id}
              >
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <div
                    {...draggableProps}
                    ref={innerRef}
                    className={cn(
                      "bg-item border-item-border text-item-border flex items-center gap-x-2 rounded-md border text-sm",
                      chapter.isPublished &&
                        "border-sky-200 bg-sky-100 text-sky-700",
                    )}
                  >
                    <div
                      {...dragHandleProps}
                      className={cn(
                        "border-r-item-border rounded-l-md border-r px-2 py-3 transition",
                        "hover:bg-item-border hover:text-item",
                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200",
                      )}
                    >
                      <Grip className="h-5 w-5" />
                    </div>

                    {chapter.title}

                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        variant={chapter.isPublished ? "default" : "muted"}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="h-4 w-4 cursor-pointer transition hover:opacity-80"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ChaptersList;
