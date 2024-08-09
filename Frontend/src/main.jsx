import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="997696378611-qvopoihd2m7gvegm7hi8ud1t7aftrfv5.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>,
)
