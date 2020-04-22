import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Auth0Provider, useAuth0 } from "./utils/auth";
import history from "./utils/history";
import App from "./App";
import ApolloWrapper from "./ApolloWrapper";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_CLIENT_ID}
      audience={process.env.REACT_APP_AUDIENCE}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloWrapper>
        <App />
      </ApolloWrapper>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
