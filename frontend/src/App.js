import React from "react";
import Navbar from "./components/Navbar";
import Index from "./components/home/Index";
import Footer from "./components/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import HomePage from "./components/HomePage"
import PasswordRecovery from "./components/auth/PasswordRecovery";
import { Routes, Route } from 'react-router-dom'
import EmailVerification from "./components/auth/EmailVerification";
import Header from "./components/Header";

function App() {
  return (
    <div className="font-Karla max-w-screen-2xl text-base mx-auto px-8">
      <Header />
      {/* Components will render here */}
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email-verification/' element={<EmailVerification />} />
        <Route path='/forget-password' element={<PasswordRecovery />} />

      </Routes>

      <Footer />

    </div>
  );
}

export default App;
