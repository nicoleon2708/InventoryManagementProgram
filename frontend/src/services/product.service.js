import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://127.0.0.1:8000/inventory/';

const createNewProduct = (data) =>{
    return axios.post(API_URL + 'product/create/', data, authHeader(), {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

const deleteProduct = (id) => {
    return axios.delete(API_URL + `product/${id}/delete/`, authHeader());
}
const updateProduct = (id, data) => {
    return axios.put(API_URL + `product/${id}/update/`, authHeader())
}

const getAllProducts = () =>{
    return axios.get(API_URL + 'product/', authHeader());
}

const getSpecificProduct = (id) => {
    return axios.get(API_URL + `product/${id}/`, authHeader());
}

const productService = {
    createNewProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSpecificProduct
}

export default productService;
