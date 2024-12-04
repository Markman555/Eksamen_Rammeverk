import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './features/store';
import App from './App'; // Hovedkomponenten for appen

// Sett opp root elementet for applikasjonen
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}> {/* Gjør Redux store tilgjengelig i applikasjonen */}
    <Router> {/* Sett opp React Router for navigasjon */}
      <App />
    </Router>
  </Provider>
);
