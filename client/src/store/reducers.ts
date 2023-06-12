import { combineReducers } from "redux";

import appReducer from "./app/reducers";
import authReducer from "./auth/reducers";
import todosReducer from "./todos/reducers";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todos: todosReducer,
});

export default rootReducer;
