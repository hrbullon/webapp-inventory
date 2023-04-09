import { fetchData } from "src/helpers/helpers";

export const getAllProducts = () => {
    return fetchData(`products`, 'GET');
}

export const getProductById = (id) => {
    return fetchData(`product/${id}`, 'GET');
}

export const createProduct = (data) => {
    return fetchData(`product`, 'POST', data, true);
}

export const updateProduct = (id, data) => {
    return fetchData(`product/${id}`, 'PUT', data, true);
}