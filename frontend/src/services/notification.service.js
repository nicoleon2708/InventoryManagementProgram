import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/push_notification/';

const getAllNotifications = () =>{
    return axios.get(API_URL + 'notification/', authHeader())
}

const markNotificationAsRead = (id) => {
    return axios.put(API_URL + `notification/${id}/mark_as_read/`, authHeader())
}

const notificationService = {
    getAllNotifications,
    markNotificationAsRead
}

export default notificationService;
