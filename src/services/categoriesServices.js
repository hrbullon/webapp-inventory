import { fetchData } from "src/helpers/helpers";

const API_URL = "http://localhost:8000";

export const getAllCategories = () => {
    return  fetchData(`${API_URL}/categories`, 'GET');
}

export const createCategory = (data) => {
    return fetchData(`${API_URL}/category`, 'POST', data);
}

export const updateCategory = (id, data) => {
    return fetchData(`${API_URL}/category/${id}`, 'PUT', data);
}

export const deleteCategory = (category) => {
    return fetchData(`${API_URL}/category/${category}`, 'DELETE');
}