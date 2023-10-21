import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://${process.env.REACT_APP_BACKEND_URL}/inventory/`;

const createNewLocationStock = (data) => {
    return axios.post(API_URL + 'stock/add_stock/', data, authHeader())
}

const updateLocationStock = (id, data) => {
    return axios.put(API_URL + `stock/${id}/update/`, data, authHeader())
}

const substractStockLocation = (id) => {
    return axios.post(API_URL + `stock/${id}/substract/`, authHeader())
}

const deleteLocationStock = (id) => {
    return axios.delete(API_URL + `stock/${id}/delete/`, authHeader())
}

const getAllLocationStock = () => {
    return axios.get(API_URL + 'stock/', authHeader())
}

const getSpecificLocation = (id) => {
    return axios.get(API_URL + `stock/${id}/`, authHeader())
}

const tranferStockLocation = (data) => {
    return axios.post(API_URL + 'stock/transfer/', data, authHeader())
}

const locationStockService = {
    createNewLocationStock,
    updateLocationStock,
    deleteLocationStock,
    getAllLocationStock,
    getSpecificLocation,
    tranferStockLocation
}
export default locationStockService
