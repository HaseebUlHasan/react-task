import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Post } from "@/types/post";

interface PostCardProps {
  item: Post;
  onDelete: (id: number) => Promise<void>;
  onEdit: (item: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ item, onDelete, onEdit }) => {
  return (
    <div
      key={item.id}
      className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
          <p className="mt-1 text-gray-600">{item.description}</p>
        </div>
        <div className="ml-4 flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 text-red-600 hover:text-red-800 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
