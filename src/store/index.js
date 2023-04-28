import { createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import todosReducer from "./todos/reducers";

const rootReducer = combineReducers({
  todos: todosReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
