import React from 'react'
import ReactDOM from 'react-dom/client'
import "./assets/styles/globals.scss"
import "./assets/styles/index.scss";
import Routes from './routes/routes.tsx';
import AuthProvider from './contexts/Authentication.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes/>
      <ToastContainer/>
    </AuthProvider>
  </React.StrictMode>
)
