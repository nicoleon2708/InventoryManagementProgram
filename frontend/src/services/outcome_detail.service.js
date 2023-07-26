import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/inventory/';

const getAllOutcomeDetails = () =>{
    return axios.get(API_URL + 'outcome_detail/', authHeader())
}
const createNewOutcomeDetail = (data) =>{
    return axios.post(API_URL + 'outcome_detail/create/', data, authHeader())
}

const getOutcomeDetailById = (id) =>{
    return axios.get(API_URL + `outcome_detail/${id}/`, authHeader())
}

const deleteOutcomeDetail = (id) =>{
    return axios.delete(API_URL + `outcome_detail/${id}/delete/`, authHeader())
}

const updateOutcomeDetail = (id, data) =>{
    return axios.put(API_URL + `outcome_detail/${id}/update/`, data, authHeader())
}

const outcomeDetailService = {
    getAllOutcomeDetails,
    createNewOutcomeDetail,
    getOutcomeDetailById,
    deleteOutcomeDetail,
    updateOutcomeDetail
}

export default outcomeDetailService;
