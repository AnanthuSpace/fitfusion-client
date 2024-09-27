import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="794089668056-g379bof90cms4e2rn8qg26vlf8pqgv59.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
