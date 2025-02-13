"use client";

import { useState, useEffect } from "react";

import PostForm from "@/components/add-form";
import PostList from "@/components/post-list";

import { Post } from "@/types/post";
import { PostFormData } from "@/types/form-data";
import { fetchPost, createPost, updatePost, deletePost } from "@/services/api";

export default function Home() {
  const [items, setItems] = useState<Post[]>([]);
  const [editingItem, setEditingItem] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetchPost();
      setItems(data);
    } catch {
      setError("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  const handlecreatePost = async (data: PostFormData) => {
    try {
      const newItem = await createPost(data);
      setItems([newItem, ...items]);
      setIsModalOpen(false);
    } catch {
      setError("Failed to create item");
    }
  };

  const handleupdatePost = async (data: PostFormData) => {
    if (!editingItem) return;
    try {
      const updatedItem = await updatePost(editingItem.id, data);
      setItems(
        items.map((item) => (item.id === editingItem.id ? updatedItem : item))
      );
      setEditingItem(null);
      setIsModalOpen(false);
    } catch {
      setError("Failed to update item");
    }
  };

  const handledeletePost = async (id: number) => {
    try {
      await deletePost(id);
      setItems(items.filter((item) => item.id !== id));
    } catch {
      setError("Failed to delete item");
    }
  };

  const handleEditClick = (item: Post) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <main className="w-full max-w-[1500px] mx-auto h-screen px-4 py-8 flex flex-col justify-between mb-2">
      <h1 className="text-3xl font-bold text-center mb-8">React Task</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-2">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded"
        >
          Add New Post
        </button>
      </div>

      <PostList
        items={items}
        onDelete={handledeletePost}
        onEdit={handleEditClick}
      />

      {isModalOpen && (
        <PostForm
          onSubmit={editingItem ? handleupdatePost : handlecreatePost}
          initialData={editingItem}
          buttonText={editingItem ? "Update Post" : "Add Post"}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </main>
  );
}
