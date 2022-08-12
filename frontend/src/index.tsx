import React from 'react';
import ReactDOM from 'react-dom/client';
import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

Sentry.init({
  dsn: "https://5ac29db0bd4245c9bae6166989a4af28@o365863.ingest.sentry.io/6622932",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const instance = createInstance({
  urlBase: 'https://m.sitch.nz',
  siteId: 1,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MatomoProvider value={instance}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MatomoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
