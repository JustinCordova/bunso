import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("bunso_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const url = "http://localhost:4000/posts";
const userUrl = "http://localhost:4000/users";

export const fetchPosts = (page = 1, limit = 10) =>
  axios.get(url + `?page=${page}&limit=${limit}`);
export const fetchPost = (id) => axios.get(`${url}/${id}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
// Auth APIs
export const register = (userData) => axios.post(`${userUrl}/signup`, userData);
export const login = (credentials) =>
  axios.post(`${userUrl}/signin`, credentials);
export const updateUser = (id, userData) =>
  axios.patch(`${userUrl}/${id}`, userData);
