import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import VerifyOtp from './pages/verify-otp/VerifyOtp';
import VerifyEmailLink from './pages/verify-link/VerifyEmailLink';
import { ToastContainer } from 'react-toastify';
import Home from './pages/home/mainapp';
import PracticePage from './pages/practice/PracticePage';


function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to='/register' replace />;
  }

  return children;
}


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/register' replace />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/verify-email-link' element={<VerifyEmailLink />} />

        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path='/practice'
          element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to='/register' replace />} />
      </Routes>

      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  );
}

export default App;
