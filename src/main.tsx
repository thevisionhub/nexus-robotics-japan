import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { SavedRobotsProvider } from './contexts/SavedRobotsContext';
import { CompareProvider } from './contexts/CompareContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SavedRobotsProvider>
        <CompareProvider>
          <App />
        </CompareProvider>
      </SavedRobotsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
