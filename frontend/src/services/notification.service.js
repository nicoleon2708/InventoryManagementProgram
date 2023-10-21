import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://${process.env.REACT_APP_BACKEND_URL}/push_notification/`;

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
