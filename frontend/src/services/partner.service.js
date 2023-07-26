import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/inventory/';

const getAllPartner = () =>{
    return axios.get(API_URL + 'partner/', authHeader())
}
const registerPartner = (data) =>{
    return axios.post(API_URL + 'partner/register/', data, authHeader())
}

const getPartnerById = (id) =>{
    return axios.get(API_URL + `partner/${id}/`, authHeader())
}

const deletePartner = (id) =>{
    return axios.delete(API_URL + `partner/${id}/delete/`, authHeader())
}

const updatePartner = (id, data) =>{
    return axios.put(API_URL + `partner/${id}/update/`, data, authHeader())
}

const setUpExternalLocationWarehouse = (id, data) =>{
    return axios.put(API_URL + `partner/${id}/update_external_location/`, data, authHeader())
}

const partnerService = {
    getAllPartner,
    registerPartner,
    getPartnerById,
    deletePartner,
    updatePartner,
    setUpExternalLocationWarehouse
}

export default partnerService;
