import { combineReducers } from "redux";
import auth from "./auth";
import permissions from "./permissions";
import appData from "./appData";

export default combineReducers({ 
  auth, 
  permissions,
  appData,
});