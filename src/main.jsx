import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProviders } from './context/index.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProviders>
    <App />
  </AppProviders>
)
