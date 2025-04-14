'use client';
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import 'react-resizable/css/styles.css';
import { gridCols, gridUnit, dndInitialTiles } from '@/constants';
import { IDndTile } from '../types/types';
import { Card } from './ui/card';
import { renderTileContent } from '@/lib/utils';
import { useLocalStorageDndTiles } from '@/hooks/useLocalStorageDndTiles';

export const DndKitVersion = () => {
  const [tiles, setTiles] = useLocalStorageDndTiles(
    'dndTiles',
    dndInitialTiles
  );
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const oldIndex = tiles.findIndex((t) => t.id === active.id);
    const newIndex = tiles.findIndex((t) => t.id === over.id);

    const updated = [...tiles];
    const temp = updated[oldIndex];
    updated[oldIndex] = updated[newIndex];
    updated[newIndex] = temp;
    setTiles(updated);
    setActiveId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">DndKit Grid</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={tiles.map((t) => t.id)}
          strategy={rectSortingStrategy}
        >
          <div
            className="grid gap-4"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
              gridAutoRows: `${gridUnit}px`,
            }}
          >
            {tiles.map((tile) => (
              <SortableTile key={tile.id} tile={tile} />
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={false}>
          {activeId ? (
            <SortableTile
              tile={tiles.find((t) => t.id === activeId) as IDndTile}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

function SortableTile({
  tile,
  isOverlay = false,
}: {
  tile: IDndTile;
  className?: string;
  isOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: tile.id });

  const style: React.CSSProperties = {
    transition,
    opacity: isDragging ? 0.5 : isOver ? 0.4 : 1,
    position: 'relative',
    ...(isOverlay
      ? {
          width: `${tile.colSpan * 115}px`,
          height: `${tile.rowSpan * gridUnit}px`,
        }
      : {
          gridColumn: `span ${tile.colSpan} / span ${tile.colSpan}`,
          gridRow: `span ${tile.rowSpan}`,
        }),
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <div className="bg-white rounded-2xl shadow h-full w-full cursor-default">
        <Card className="rounded-2xl border p-2 shadow-md relative group h-full">
          <div
            {...listeners}
            className="absolute top-2 right-2 p-1 rounded cursor-grab"
          >
            ☰
          </div>
          {renderTileContent(tile, 'dnd')}
        </Card>
      </div>
    </div>
  );
}
