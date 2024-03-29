import { 
  SET_TOKEN,
  BULK_CONFIGS_APP,
  SET_PERMISSIONS,
  SET_USERS,
  SET_COMPANIES,
  SET_PRODUCTS,
  SET_BASEPLANS,
  SET_PROCESS,
  SET_PROCESS_REQUEST,
  SET_FAILED_REQUEST,
} from "./actionTypes";

export const setToken = token => ({ type: SET_TOKEN, payload: { token } });

export const setPermissions = permissions => ({ type: SET_PERMISSIONS, payload: permissions });

export const bulkConfigsApp = configs => ({ type: BULK_CONFIGS_APP, payload: configs });

export const storeUsers = users => ({ type: SET_USERS, payload: users });

export const storeCompanies = companies => ({ type: SET_COMPANIES, payload: companies });

export const storeProducts = products => ({ type: SET_PRODUCTS, payload: products });

export const storeBaseplans = baseplans => ({ type: SET_BASEPLANS, payload: baseplans });

export const storeProcess = process => ({ type: SET_PROCESS, payload: process });

export const saveRequest = payload => ({ type: SET_PROCESS_REQUEST, payload: payload });

export const bulkFailedRequests = request => ({ type: SET_FAILED_REQUEST, payload: request });

