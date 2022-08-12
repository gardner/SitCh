import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import * as Sentry from "@sentry/browser";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import Gallery from './Gallery';
import SeatMap from './SeatMap';

function App() {

  return (
    <div className="App">
      <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href="http://SitCh.nz" />
          <meta property="og:description" content="A structure designed to support a person in the sitting position." data-rh="true" />
      </Helmet>
      <Routes>
        <Route path="/" element={<SeatMap />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>

      <footer>
        <p>Random acts of data <a href="mailto:info@sitch.nz">contact</a></p>
      </footer>
    </div>
  );
}

export default App;
