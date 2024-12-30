import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSIgnup from './pages/UserSIgnup'
import CaptionLogin from './pages/CaptionLogin'
import CaptionSignup from './pages/CaptionSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSIgnup />} />
        <Route path='/caption-login' element={<CaptionLogin />} />
        <Route path='/caption-signup' element={<CaptionSignup />} />
      </Routes>
    </div>
  )
}

export default App