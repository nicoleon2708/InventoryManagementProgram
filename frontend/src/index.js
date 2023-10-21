import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <ToastContainer />

    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </CookiesProvider>


);


