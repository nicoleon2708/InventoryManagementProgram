import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, recoveryFailed, recoveryStart, recoverySuccess, registerFailed, registerStart, registerSuccess, resetFailed, resetStart, resetSuccess, verifyFailed, verifyStart, verifySuccess } from "./authSlice";
import { toast } from 'react-toastify'

// login api
export const login = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/auth/user/login/', user);
        dispatch(loginSuccess(res.data));
        navigate('/home');
    } catch (err) {
        dispatch(loginFailed())
    }
}

// register api
export const register = async (data, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/auth/user/register/', data);
        dispatch(registerSuccess(res.data));
        navigate('/confirm-email');
    } catch (error) {
        dispatch(registerFailed())
    }
}

// logout api
export const logout = async (data, dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/auth/user/logout/', data);
        dispatch(logoutSuccess(res.data));
        navigate('/login');
    } catch (error) {
        dispatch(logoutFailed())
    }
}

// email verification api
export const verify_email = async (token, dispatch, navigate) => {
    dispatch(verifyStart());
    try {
        const res = await axios.get(`http://127.0.0.1:8000/auth/email-verification/${token}/`)
        dispatch(verifySuccess(res.data))
    } catch (error) {
        dispatch(verifyFailed())
    }
}

// recovery password request api
export const recover_password = async (data, dispatch, navigate) => {
    dispatch(recoveryStart());
    try {
        const res = await axios.post('http://127.0.0.1:8000/auth/recovery-password/', data);
        dispatch(recoverySuccess(res.data));
        navigate('/sending-confirm');
    } catch (error) {
        dispatch(recoveryFailed())
    }
}

// reset password api
export const reset_password = async (data, dispatch, navigate, uidb64, token) => {
    dispatch(resetStart());
    try {
        const res = await axios.put(`http://127.0.0.1:8000/auth/reset-password/${uidb64}/${token}/`, data);
        dispatch(resetSuccess(res.data))
        navigate('/login');
    } catch (error) {
        dispatch(resetFailed())
    }
}
