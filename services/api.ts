import axios from 'axios';

import { Post } from '@/types/post';
import { ApiPost } from '@/types/api-post';
import { PostFormData } from '@/types/form-data';

// base url
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

//fetch all posts
export const fetchPost = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<ApiPost[]>(`${API_BASE_URL}/posts`);
    return response.data.map((item: ApiPost) => ({
      id: item.id,
      title: item.title,
      description: item.body
    }));
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// create new post
export const createPost = async (data: PostFormData): Promise<Post> => {
  try {
    const response = await axios.post<ApiPost>(`${API_BASE_URL}/posts`, {
      title: data.title,
      body: data.description,
      userId: 1
    });
    return {
      id: response.data.id,
      title: response.data.title,
      description: response.data.body
    };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// edit the existing post
export const updatePost = async (id: number, data: PostFormData): Promise<Post> => {
  try {
    const response = await axios.put<ApiPost>(`${API_BASE_URL}/posts/${id}`, {
      title: data.title,
      body: data.description,
      userId: 1
    });
    return {
      id: response.data.id,
      title: response.data.title,
      description: response.data.body
    };
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};


// delete the post 
export const deletePost = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${id}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};