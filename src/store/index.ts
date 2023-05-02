import { combineReducers, Dispatch, AnyAction } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import todosReducer from "./todos/reducers";

const rootReducer = combineReducers({
  todos: todosReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Dispatch<AnyAction>;
