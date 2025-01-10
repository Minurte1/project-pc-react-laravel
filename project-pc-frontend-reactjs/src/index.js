import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/global.scss";

import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Thay thế <your_client_id> bằng Client ID của bạn

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      // clientId={`281404748457-87k9op4pjn3umqjlp51e0fthlsssqctj.apps.googleusercontent.com`}
      clientId={`615471242628-75o7dlh1b5k18iefa0nmfm5sl9eg3coi.apps.googleusercontent.com`}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
