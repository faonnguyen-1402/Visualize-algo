import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import VerifyOtp from './pages/verify-otp/VerifyOtp';
import VerifyEmailLink from './pages/verify-link/VerifyEmailLink';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home/mainapp';
import ProfilePage from './pages/profile/profilepage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/ProfilePage' replace />} />
        {/* <Route path='/register' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/verify-email-link' element={<VerifyEmailLink />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} /> */}
        <Route path='/ProfilePage' element={<ProfilePage />} />
      </Routes>
      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  );
}

export default App;
