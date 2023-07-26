import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/inventory/';

const getAllRule = () =>{
    return axios.get(API_URL + 'rule/', authHeader())
}
const createNewRule = (data) =>{
    return axios.post(API_URL + 'rule/set_up/', data, authHeader())
}

const getRuleById = (id) =>{
    return axios.get(API_URL + `rule/${id}/`, authHeader())
}

const deleteRule = (id) =>{
    return axios.delete(API_URL + `rule/${id}/delete/`, authHeader())
}

const updateRule = (id, data) =>{
    return axios.put(API_URL + `rule/${id}/update/`, data, authHeader())
}

const ruleService = {
    getAllRule,
    getRuleById,
    createNewRule,
    deleteRule,
    updateRule
}

export default ruleService;
