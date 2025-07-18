import * as api from "../api/index.js";
import { fetchAll, create, update, like, deletePost } from "../reducers/posts";
import { fetchPost } from "../reducers/post";
import { SEARCH_POSTS } from "../constants/actionTypes";

export const getPosts =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      const { data } = await api.fetchPosts(page, limit);
      dispatch(fetchAll(data.posts));
      return { total: data.total, posts: data.posts };
    } catch (error) {
      console.log(error.message);
      return { total: 0, posts: [] };
    }
  };

export const getPost = (id) => async (dispatch) => {
  try {
    console.log("Fetching post with ID:", id);
    const { data } = await api.fetchPost(id);
    console.log("Received post data:", data);
    if (data) {
      dispatch(fetchPost(data));
    }
    return data;
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null;
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch(create(data));
    return { success: true };
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    return {
      success: false,
      errors: error.response?.data?.errors || [
        { msg: error.response?.data?.message || error.message },
      ],
    };
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    console.log("Updating post:", { id, post });
    const { data } = await api.updatePost(id, post);
    console.log("Update response:", data);
    dispatch(update(data));
    return { success: true };
  } catch (error) {
    console.error(
      "Error updating post:",
      error.response?.data || error.message
    );
    return {
      success: false,
      errors: error.response?.data?.errors || [
        { msg: error.response?.data?.message || error.message },
      ],
    };
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch(like(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePostAction = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(deletePost(id));
  } catch (error) {
    console.log(error.message);
  }
};

export const searchPosts = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await api.searchPosts(searchTerm);
    dispatch({ type: SEARCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
