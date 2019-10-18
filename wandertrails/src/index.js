import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import WanderTrails from './components/WanderTrails'

ReactDOM.render(
  <Router>
    <WanderTrails />
  </Router>
  , document.getElementById('root'))