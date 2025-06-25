import React from 'react'
import LoginPage from './pages/LoginPage/index'
import './App.scss'
import { Router } from 'react-bootstrap-icons'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/Login' element={<LoginPage />} />/
    </Routes>
  )
}

export default App
