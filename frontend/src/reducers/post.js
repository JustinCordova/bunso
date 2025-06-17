import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: null,
  reducers: {
    fetchPost: (state, action) => {
      console.log("Reducer received post data:", action.payload);
      return action.payload;
    },
  },
});

export const { fetchPost } = postSlice.actions;
export default postSlice.reducer;
