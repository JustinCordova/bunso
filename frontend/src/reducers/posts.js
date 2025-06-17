import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

const postsSlice = createSlice({
  name: "posts",
  initialState: null,
  reducers: {
    fetchAll: (state, action) => action.payload,
    create: (state, action) =>
      state ? [...state, action.payload] : [action.payload],
    update: (state, action) =>
      state
        ? state.map((post) =>
            post._id === action.payload._id ? action.payload : post
          )
        : [action.payload],
    like: (state, action) =>
      state
        ? state.map((post) =>
            post._id === action.payload._id ? action.payload : post
          )
        : [action.payload],
    delete: (state, action) =>
      state ? state.filter((post) => post._id !== action.payload) : [],
  },
});

export const {
  fetchAll,
  create,
  update,
  like,
  delete: deletePost,
} = postsSlice.actions;
export default postsSlice.reducer;
