import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://127.0.0.1:8000/auth/user/";
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

const authService = {
  register,
  login,
  logout,
  getCurrentUser
};
export default authService;
