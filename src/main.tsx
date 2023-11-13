import React from 'react'
import ReactDOM from 'react-dom/client'
import "./assets/styles/globals.scss"
import "./assets/styles/index.scss";
import Routes from './routes/routes.tsx';
import AuthProvider from './contexts/Authentication.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  </React.StrictMode>
)
