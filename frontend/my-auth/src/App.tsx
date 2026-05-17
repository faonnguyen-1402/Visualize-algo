import React from "react";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import VerifyOtp from "./pages/verify-otp/VerifyOtp";
import VerifyEmailLink from "./pages/verify-link/VerifyEmailLink";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/mainapp";
import AlgorithmDetail from "./components/AlgorithmDetail";
import "katex/dist/katex.min.css";
import ProfilePage from "./pages/profile/profilepage";
import ExerciseDetail from "./pages/practice/ExerciseDetail";
import PracticePage from "./pages/practice/PracticePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/verify-email-link" element={<VerifyEmailLink />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path='/' element={<Navigate to='/home' replace />} /> */}
        {/* <Route path='/register' element={<Register />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/verify-email-link' element={<VerifyEmailLink />} />
        <Route path='/login' element={<Login />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/algorithms" element={<Home />} />
        <Route path="/algorithms/:slug" element={<AlgorithmDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/:slug/:difficulty" element={<ExerciseDetail />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
