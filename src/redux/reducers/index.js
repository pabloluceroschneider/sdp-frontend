import { combineReducers } from "redux";
import auth from "./auth";
import permissions from "./permissions";
import appData from "./appData";
import process from "./process";

const appReducer = combineReducers({ 
  auth, 
  permissions,
  appData,
  process,
});

const rootReducer = (state, action) => {
  if (action.type === 'SET_TOKEN' && !action.payload.token) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer