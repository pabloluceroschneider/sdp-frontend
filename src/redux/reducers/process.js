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
      const requests = state.requests|| [];
      const { request, object } = action.payload;

      const item = state.data.find(t => t._id === object.id);
      const newItem = { ...item, ...object.values };
      const index = item.tableData.id;

      const newData = state.data;
      newData.splice(index, 1, newItem);

      return {
        ...state,
        requests: [...requests, request],
        data: newData
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
