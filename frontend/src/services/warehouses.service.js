import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/inventory/'

const createNewWarehouse = (data) =>{
    return axios.post(API_URL +'warehouse/create/', data, authHeader());
}

const deleteWarehouse = (id) =>{
    return axios.delete(API_URL+ `warehouse/${id}/delete/`, authHeader());
}

const updateWarehouse = (id, data) =>{
    return axios.put(API_URL + `warehouse/${id}/update/`, data, authHeader());
}

const getAllWarehouses = () =>{
    return axios.get(API_URL + 'warehouse/', authHeader());
};

const getSpecificWarehouse = (id) => {
    return axios.get(API_URL + `warehouse/${id}/`, authHeader());
}

const warehouseService = {
    createNewWarehouse,
    deleteWarehouse,
    updateWarehouse,
    getAllWarehouses,
    getSpecificWarehouse
}
export default warehouseService;
