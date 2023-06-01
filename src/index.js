import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { BrowserRouter } from "react-router-dom";
import { CartSumContextProvider } from "./Store/CartSumContext";
import { AuthContextProvider } from "./Store/AuthContext";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <CartSumContextProvider>
            <App />
          </CartSumContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  </I18nextProvider>,
  document.getElementById("root")
);
