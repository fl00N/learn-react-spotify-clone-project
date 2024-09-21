import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import PlaylistProvider from './contexts/PlaylistContext.jsx'
import PlayerContextProvider from './contexts/PlayerContext.jsx'
import { AuthProvider } from './contexts/AuthContext';
import { ContextMenuProvider } from './contexts/MenuContext.jsx'
import { EditModalProvider } from './contexts/EditModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlaylistProvider>
          <PlayerContextProvider>
            <EditModalProvider>
              <ContextMenuProvider>
                <App />
              </ContextMenuProvider>
            </EditModalProvider>
          </PlayerContextProvider>
        </PlaylistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
