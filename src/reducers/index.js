import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import tokenReducer from "./login";
import logout from "./login";
import task from "./task";

const reducers = combineReducers({ tokenReducer, task, logout });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};
export default store();