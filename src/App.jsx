import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteComponent from './routes/RouteComponent'
import './App.css'

function App() {
  return (
    <Router>
      <RouteComponent />
    </Router>
  )
}

export default App
