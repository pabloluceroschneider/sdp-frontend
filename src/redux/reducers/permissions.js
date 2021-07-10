import { SET_PERMISSIONS } from "../actionTypes";

const initialState = null

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PERMISSIONS: {
      const permissions = action.payload;
      return permissions
    }
    default:
      return state;
  }
}
