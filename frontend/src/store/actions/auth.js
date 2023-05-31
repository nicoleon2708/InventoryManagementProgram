import * as actionTypes from './actionTypes'
import axios from 'axios'

API_URL = 'http://127.0.0.1/auth/user/'

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogin = (username, password) =>{
    // dispatch is a method call a action
    return dispatch => {
        dispatch(authStart());
        axios.post(API_URL+'login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.token.access;
            localStorage.setItem('token', token)
            dispatch(authSuccess(token));

        })
    }
}

export const logout = () =>{
    localStorage.removeItem('user')
}

