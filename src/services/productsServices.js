import { fetchData } from "src/helpers/helpers";

const API_URL = "http://localhost:8000";

export const getAllProducts = () => {
    return fetchData(`${API_URL}/products`, 'GET');
}

export const getProductById = (id) => {
    return fetchData(`${API_URL}/product/${id}`, 'GET');
}

export const createProduct = (data) => {
    return fetchData(`${API_URL}/product`, 'POST', data, true);
}

export const updateProduct = (id, data) => {
    return fetchData(`${API_URL}/product/${id}`, 'PUT', data, true);
}