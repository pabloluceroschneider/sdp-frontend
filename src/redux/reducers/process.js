import {
  SET_PROCESS,
  SET_PROCESS_REQUEST,
  SET_FAILED_REQUEST,
} from "../actionTypes";

const initialState = {
  data: [],
  requests: {},
  history: {},
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
      const { id, body } = action.payload;
      const history = state.history || [];
      const historyId = history[id] || [];

      const item = state.data.find(t => t._id === id);
      const newItem = { ...item, ...body };
      const index = item.tableData.id;

      const newData = state.data;
      newData.splice(index, 1, newItem);

      const { timeStart, timeEnd, ...rq } = body;

      return {
        ...state,
        requests: {
          ...state.requests,
          [id]: rq,
        },
        history: {
          ...history,
          [id]: [...historyId, body],
        },
        data: newData
      };
    }
    case SET_FAILED_REQUEST: {
      return {
        ...state,
        requests: {},
        history: {},
      };
    }
    default:
      return state;
  }
}
