import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";

import "./index.css";
import App from "./App";
import rootReducer from "./store/reducers";

const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
