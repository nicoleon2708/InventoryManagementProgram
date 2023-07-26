import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/inventory/';

const getAllGroupRule = () =>{
    return axios.get(API_URL + 'group_rule/', authHeader())
}

const createNewGroupRule = (data) =>{
    return axios.post(API_URL + 'group_rule/create/', data, authHeader())
}

const getGroupRuleById = (id) =>{
    return axios.get(API_URL + `group_rule/${id}/`, authHeader())
}

const deleteGroupRule = (id) =>{
    return axios.delete(API_URL + `group_rule/${id}/delete/`, authHeader())
}

const updateGroupRule = (id, data) =>{
    return axios.put(API_URL + `group_rule/${id}/update/`, data, authHeader())
}



const groupRuleService = {
    getAllGroupRule,
    createNewGroupRule,
    getGroupRuleById,
    deleteGroupRule,
    updateGroupRule
}

export default groupRuleService;
