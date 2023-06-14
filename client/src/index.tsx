import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/cssReset.css";
import { store, persistor } from "@store/index";
import { ThemeProvider } from "@context/ThemeContext";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
