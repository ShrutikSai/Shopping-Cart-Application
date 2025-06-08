import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider  from './context/ShopContext.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ShopContextProvider>
         <App />
      </ShopContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
