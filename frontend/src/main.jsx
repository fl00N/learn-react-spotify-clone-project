import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './contexts/PlayerContext.jsx'
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
