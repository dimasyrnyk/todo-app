import { combineReducers } from "redux";

import appReducer from "./app/AppSlice";
import authReducer from "./auth/AuthSlice";
import todosReducer from "./todos/TodosSlice";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todos: todosReducer,
});

export default rootReducer;
