import React, {useEffect} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ()=> {
    const navigate = useNavigate()
    const isAuthenticated = localStorage.getItem('token') == null ? false:true; 

    const isTokenExpired = (token) => {
        if (token) {
            const access_token = token.token.access
            const token_decoded = jwt_decode(access_token)          
            return token_decoded.exp * 1000 < Date.now();
        }
        return true;
      };

      const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

      useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token')); 
        console.log(token)
        if (isTokenExpired(token)) {
          logout();
        }
      }, []);

    return (
        <>
            {isAuthenticated ? <Outlet /> : <Navigate to='/login' />}
        </>

    )
}

export default ProtectedRoute
