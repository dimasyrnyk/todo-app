import { combineReducers } from "redux";
import todosReducer from "./todos/reducers";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
