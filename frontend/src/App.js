import React from "react";
import ProtectedRoute from '../src/components/auth/ProtectedRoute'
import Index from "./components/home/Index";
import Footer from "./components/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/user_dashboard/Home";
import PasswordRecovery from "./components/auth/PasswordRecovery";
import { Routes, Route } from 'react-router-dom'
import EmailVerification from "./components/auth/EmailVerification";
// import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Warehouse from "./components/user_dashboard/Warehouse";
import Product from "./components/user_dashboard/Product";
import Location from './components/user_dashboard/Location'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <div className="font-Karla max-w-screen-2xl text-base">
      <Navbar />
      {/* Components will render here */}
      <Routes>
        <Route path='/' element={<Index />} />
        <Route exact path='/home' element={<ProtectedRoute/>}>
            <Route exact path='/home' element={<Home/>}>
              <Route path="/home/warehouse" element={<Warehouse/>}/>
              <Route path="/home/location"  element={<Location/>}/>
              <Route path="/home/product" element={<Product/>}/>
            </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email-verification/:token/' element={<EmailVerification />} />
        <Route path='/forget-password/:uidb64/:token/' element={<PasswordRecovery />} />

      </Routes>

      <Footer />
    </div>
          </>

  );
}

export default App;
