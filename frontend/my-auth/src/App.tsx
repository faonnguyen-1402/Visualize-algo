import React from 'react';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import VerifyOtp from './pages/verify-otp/VerifyOtp';
import VerifyEmailLink from './pages/verify-link/VerifyEmailLink';

import { ToastContainer } from 'react-toastify';
import 'katex/dist/katex.min.css';

import Home from './pages/home/mainapp';
import AlgorithmDetail from './components/AlgorithmDetail';
import ProfilePage from './pages/profile/profilepage';
import ExerciseDetail from './pages/practice/ExerciseDetail';
import PracticePage from './pages/practice/PracticePage';
import Intro from './pages/intro/Intro';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import SortingAlgorithms from './pages/intro/aboutSorting';
import SearchingAlgorithms from './pages/intro/aboutSearching';

function App() {
  const location = useLocation();

  const hideFooterRoutes = [
    '/login',
    '/register',
    '/verify-otp',
    '/verify-email-link',
  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />

        <Route path='/register' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/verify-email-link' element={<VerifyEmailLink />} />
        <Route path='/login' element={<Login />} />

        <Route path='/home' element={<Intro />} />

        <Route path='/algorithms' element={<Home />} />
        <Route path='/algorithms/:slug' element={<AlgorithmDetail />} />

        <Route path='/about-sorting' element={<SortingAlgorithms />} />
        <Route path='/about-searching' element={<SearchingAlgorithms />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/practice' element={<PracticePage />} />
          <Route
            path='/practice/:slug/:difficulty'
            element={<ExerciseDetail />}
          />
        </Route>

        <Route path='*' element={<Navigate to='/home' replace />} />
      </Routes>

      {!shouldHideFooter && <Footer />}

      <ToastContainer position='top-right' autoClose={3000} />
    </div>
  );
}

export default App;
