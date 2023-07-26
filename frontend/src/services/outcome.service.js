import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/inventory/';

const getAllOutcomes = () =>{
    return axios.get(API_URL + 'outcome/', authHeader())
}
const createNewOutcome = (data) =>{
    return axios.post(API_URL + 'outcome/create/', data, authHeader())
}

const getOutcomeById = (id) =>{
    return axios.get(API_URL + `outcome/${id}/`, authHeader())
}

const deleteOutcome = (id) =>{
    return axios.delete(API_URL + `outcome/${id}/delete/`, authHeader())
}

const updateOutcome = (id, data) =>{
    return axios.put(API_URL + `outcome/${id}/update/`, data, authHeader())
}

const outcomeService = {
    getAllOutcomes,
    createNewOutcome,
    getOutcomeById,
    deleteOutcome,
    updateOutcome
}

export default outcomeService;
