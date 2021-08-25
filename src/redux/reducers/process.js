import {
  SET_PROCESS,
  SET_PROCESS_REQUEST,
  SET_FAILED_REQUEST,
} from "../actionTypes";

const initialState = {
  data: [],
  requests: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PROCESS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case SET_PROCESS_REQUEST: {
      const requests = state.requests|| [] 
      return {
        ...state,
        requests: [...requests, action.payload],
      };
    }
    case SET_FAILED_REQUEST: {
      return {
        ...state,
        requests: action.payload,
      };
    }
    default:
      return state;
  }
}
