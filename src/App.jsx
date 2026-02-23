import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Profile from './pages/profile'
import Home from './pages/home'
import ProtectedRoute from './ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route
       path='/profile'
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
