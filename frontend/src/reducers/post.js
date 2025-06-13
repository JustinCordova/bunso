import { FETCH_POST } from "../constants/actionTypes";

const postReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_POST:
      return action.payload;
    default:
      return state;
  }
};

export default postReducer;
