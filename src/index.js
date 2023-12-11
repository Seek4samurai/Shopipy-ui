import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import RoutesHandler from "./routes";

import "./styles/index.module.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RoutesHandler />
        <div>
          <Toaster />
        </div>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

