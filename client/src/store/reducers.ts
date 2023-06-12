import { combineReducers } from "redux";

import authReducer from "./auth/reducers";
import todosReducer from "./todos/reducers";

export const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});

export default rootReducer;
