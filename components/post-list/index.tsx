import React, { useState } from "react";

import { Post } from "@/types/post";

import PostCard from "../post-card";

interface ItemListProps {
  items: Post[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (item: Post) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit }) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(12, prev - 12));
  };

  const displayedItems = items.slice(0, visibleCount);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {displayedItems.map((item) => (
          <PostCard
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {items.length > 12 && (
        <div className="text-center mt-4 flex gap-4 justify-center">
          <button
            onClick={handleShowMore}
            disabled={visibleCount >= items.length}
            className={`py-2 px-4 rounded transition ${
              visibleCount >= items.length
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Show More
          </button>

          <button
            onClick={handleShowLess}
            disabled={visibleCount === 12}
            className={`py-2 px-4 rounded transition ${
              visibleCount === 12
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Show Less
          </button>
        </div>
      )}

      {items.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No items found.</p>
      )}
    </div>
  );
};

export default ItemList;
