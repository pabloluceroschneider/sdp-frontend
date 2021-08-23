import { SET_PROCESS } from "../actionTypes";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PROCESS: {
      return {
        ...state,
        data: action.payload
      };
    }
    default:
      return state;
  }
}
