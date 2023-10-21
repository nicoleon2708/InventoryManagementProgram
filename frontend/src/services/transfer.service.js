import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://${process.env.REACT_APP_BACKEND_URL}/inventory/`;

const getAllTransfer = () =>{
    return axios.get(API_URL + 'transfer/', authHeader())
}

const getTransferById = (id) =>{
    return axios.get(API_URL + `transfer/${id}/`, authHeader())
}

const deleteTransfer = (id) =>{
    return axios.delete(API_URL + `transfer/${id}/delete/`, authHeader())
}

const confirmTransfer = (id) =>{
    return axios.post(API_URL + `transfer/${id}/confirm/`, {}, authHeader())
}

const importProductTransfer = (data) =>{
    return axios.post(API_URL + `transfer/import/`, data, authHeader())
}

const confirmPurchase = (id) =>{
    return axios.put(API_URL + `transfer/${id}/confirm_purchase/`, {}, authHeader())
}

const transferService = {
    getAllTransfer,
    getTransferById,
    deleteTransfer,
    confirmTransfer,
    importProductTransfer,
    confirmPurchase
}

export default transferService;
