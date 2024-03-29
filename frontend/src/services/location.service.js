import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://${process.env.REACT_APP_BACKEND_URL}/inventory/`;

const createNewLocation = (data) =>{
    return axios.post(API_URL + 'location/create/', data, authHeader());
}

const deleteLocation = (id) => {
    return axios.delete(API_URL + `location/${id}/delete/`, authHeader());
}
const updateLocation = (id, data) => {
    return axios.put(API_URL + `location/${id}/update/`, data, authHeader())
}

const getAllLocations = () =>{
    return axios.get(API_URL + 'location/', authHeader());
}

const getSpecificLocation = (id) => {
    return axios.get(API_URL + `location/${id}/`, authHeader());
}

const locationService = {
    createNewLocation,
    updateLocation,
    deleteLocation,
    getAllLocations,
    getSpecificLocation
}

export default locationService;
