import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import tokenReducer from "./login";
import logout from "./login";

const reducers = combineReducers({ tokenReducer, logout });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};
export default store();