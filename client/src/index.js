import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { icons } from "./assets/icons";
import { CookiesProvider } from "react-cookie";
import { StoreProvider } from "easy-peasy";

import store from "./store";

React.icons = icons;

ReactDOM.render(
  <CookiesProvider>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
