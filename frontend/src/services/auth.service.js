import axios from "axios";
import { useNavigate } from "react-router-dom";
import authHeader from "./auth-header";

const API_URL = `http://${process.env.REACT_APP_BACKEND_URL}/auth/user/`;
const register = (data) => {
  return axios.post(API_URL + 'register/', data).then(res => {
    JSON.stringify(res.data)
    return res.data
  });
}

const login = (username, password) =>{
  return axios.post(API_URL + 'login/', {
    username,
    password
  })
  .then((res) =>{
    if(res.data.token.access){
      localStorage.setItem('token', JSON.stringify(res.data))
    }
    return res.data
  })
}

const logout = () =>{
  localStorage.removeItem('token')
  if(localStorage.getItem('token')==null){
    return true;
  }
  return false;
}

const getCurrentUser = () =>{
  const user = JSON.parse(localStorage.getItem('token'));
  return user
}

const updateInformation = (id, data) =>{
  return axios.put(API_URL  + `${id}/update/`, data, authHeader())
}


const emailVerification = (token) =>{
  return axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/auth/email-verification/${token}/`)
}

const recoveryPassword = (email) =>{
  return axios.post(`http://${process.env.REACT_APP_BACKEND_URL}/auth/recovery-password/`, email)
}

const resetPassword = (uidb64, token, data) =>{
  return axios.put(`http://${process.env.REACT_APP_BACKEND_URL}/auth/reset-password/${uidb64}/${token}/`, data)
}

const changePassword = (id, data) => {
  return axios.put(`http://${process.env.REACT_APP_BACKEND_URL}/auth/user/${id}/change_password/`, data, authHeader())
}

const googleLogin = async (accesstoken) => {
  return await axios.post(
    `http://${process.env.REACT_APP_BACKEND_URL}/auth/dj-rest-auth/google/`,
    {
      access_token: accesstoken,
    }
  );
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  emailVerification,
  recoveryPassword,
  resetPassword,
  updateInformation,
  changePassword,
  googleLogin
};
export default authService;
