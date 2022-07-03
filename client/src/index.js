import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "normalize.css";
// Import style
import "./style/main.scss";
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from "react-redux";

// Import routes
import ROUTES, { RenderRoutes } from "./navigation/routes";

import configureStore from "./store/store";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <RenderRoutes routes={ROUTES} />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
