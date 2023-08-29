import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Signin from './components/signin'
import Home from './components/Home'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Exercises from './components/Exercises'
import RecordActivity from './components/RecordActivity'
import Profile from './components/Profile'
import FitnessSummary from './components/FitnessSummary'
import EditActivity from './components/EditActivity'
import TrackProgress from './components/TrackProgress'


function App() {
  return (
      <div className='contentWrapper'>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:id' element={<ResetPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='/exercises' element={<Exercises />} />
          <Route path='/recordActivity' element={<RecordActivity />} />
          <Route path='/editActivity' element={<EditActivity />} />
          <Route path='/user-profile' element={<Profile />} />
          <Route path='/fitness-summary' element={<FitnessSummary />} />
          <Route path='/track-progress' element={<TrackProgress />} />
        </Routes>
      </div>
  )
}

export default App