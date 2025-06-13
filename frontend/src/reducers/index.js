import { combineReducers } from "redux";
import postsReducer from "./posts";
import postReducer from "./post";

export default combineReducers({
  posts: postsReducer,  // posts list (array)
  post: postReducer,    // single post (object or null)
});
