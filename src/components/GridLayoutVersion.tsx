'use client';

import { renderTileContent } from '@/lib/utils';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import { Card } from './ui/card';
import { DeleteButton } from './DeleteButton';
import { useLocalStorageTiles } from '@/hooks/useLocalStorageTiles';
import { initialTiles } from '@/constants';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const GridLayoutVersion = () => {
  const [tiles, setTiles] = useLocalStorageTiles('tiles', initialTiles);

  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedTiles = tiles.map((tile) => {
      const updated = newLayout.find((l) => l.i === tile.i);
      return updated ? { ...tile, ...updated } : tile;
    });
    console.log('Updated Tiles:', updatedTiles);
    setTiles(updatedTiles);
  };

  const handleDragStop = (layout: Layout[]) => {
    const sorted = layout.sort((a, b) => a.y - b.y || a.x - b.x);
    const updatedTiles = tiles.map((tile) => {
      const updated = sorted.find((l) => l.i === tile.i);
      return updated ? { ...tile, ...updated } : tile;
    });
    setTiles(updatedTiles);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Grid Layout</h1>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 8, md: 6, sm: 4 }}
        margin={[15, 15]}
        rowHeight={90}
        resizeHandles={['se']}
        isResizable
        isDraggable
        onLayoutChange={handleLayoutChange}
        onResizeStop={handleLayoutChange}
        onDragStop={handleDragStop}
      >
        {tiles.map((tile) => (
          <Card
            key={tile.i}
            data-grid={tile}
            className="rounded-2xl border p-2 shadow-md relative group min-w-[200px] min-h-[200px] h-full bg-white cursor-grabbing"
          >
            <DeleteButton className="group-hover:flex cursor-pointer" />
            {renderTileContent(tile, 'gridLayout')}
          </Card>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
