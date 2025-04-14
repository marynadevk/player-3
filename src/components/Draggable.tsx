import { DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react';
import { Card } from './ui/card';

interface UseDraggableArguments {
  id: string | number;
  attributes?: {
    role?: string;
    roleDescription?: string;
    tabIndex?: number;
  };
  data?: Record<string, any>;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Draggable = (props: UseDraggableArguments) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  return (
      <button
        ref={setNodeRef}
        className="rounded-2xl border p-4 bg-white shadow-md flex items-center justify-center text-center text-sm font-medium w-52"
        {...listeners}
        {...attributes}
      >
        {props.children}
      </button>
  );
};

type DroppableProps = {
  children: React.ReactNode;
}

export const Droppable = (props: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children as React.ReactNode}
    </div>
  );
}
