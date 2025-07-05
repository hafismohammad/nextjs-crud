// lib/api.ts
import axios from "axios"
import { Post, NewPost } from "@/types/post"

const API_BASE_URL = "https://jsonplaceholder.typicode.com"

// Fetch all posts
export const getPosts = async (): Promise<Post[]> => {
  const res = await axios.get(`${API_BASE_URL}/posts`)
  return res.data
}

// Create a new post
export const createPost = async (newPost: NewPost): Promise<Post> => {
  const res = await axios.post(`${API_BASE_URL}/posts`, newPost)
  
  console.log('Created post:', res.data)
  
  return res.data
}

// Update an existing post
export const updatePost = async (id: number, updatedPost: Partial<Post>): Promise<Post> => {
  const res = await axios.put(`${API_BASE_URL}/posts/${id}`, updatedPost)
  
  console.log('Updated post:', res.data)
  
  return res.data
}

// Delete a post
export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`)
  
  console.log('Deleted post with ID:', id)
}


export const getPost = async (id: number): Promise<Post> => {
  const res = await axios.get(`${API_BASE_URL}/posts/${id}`)
  return res.data
}