import { fetchData } from "src/helpers/helpers";

export const getAllProducts = (data) => {
    let params = new URLSearchParams(data).toString();
    return fetchData(`products?${params}`, 'GET');
}

export const getAllProductsWithStock = () => {
    return fetchData(`products/stock`, 'GET');
}

export const getProductById = (id) => {
    return fetchData(`product/${id}`, 'GET');
}

export const createProduct = (data) => {
    return fetchData(`product`, 'POST', data, true);
}

export const updateProduct = (data, id) => {
    return fetchData(`product/${id}`, 'PUT', data, true);
}

export const deleteProduct = (id) => {
    return fetchData(`product/${id}`, 'DELETE');
}