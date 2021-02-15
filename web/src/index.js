import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';

// Mock server
import { makeServer } from "./server"

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();