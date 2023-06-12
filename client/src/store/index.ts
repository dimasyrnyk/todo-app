import { AnyAction, Store, applyMiddleware } from "redux";
import { ThunkDispatch } from "redux-thunk";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
