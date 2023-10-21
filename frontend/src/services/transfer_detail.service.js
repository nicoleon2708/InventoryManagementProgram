import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://${process.env.REACT_APP_BACKEND_URL}/inventory/`;

const getAllTransferDetail = () =>{
    return axios.get(API_URL + 'transfer_detail/', authHeader())
}

const getTransferDetailById = (id) =>{
    return axios.get(API_URL + `transfer_detail/${id}/`, authHeader())
}

const deleteTransferDetail = (id) =>{
    return axios.delete(API_URL + `transfer_detail/${id}/delete/`, authHeader())
}

const transferDetailService = {
    getAllTransferDetail,
    getTransferDetailById,
    deleteTransferDetail
}

export default transferDetailService;
