import { fetchData } from "src/helpers/helpers";

export const getAllCategories = (data = "") => {
    return  fetchData(`categories?search=${data}`, 'GET');
}

export const createCategory = (data) => {
    return fetchData(`category`, 'POST', data);
}

export const updateCategory = (id, data) => {
    return fetchData(`category/${id}`, 'PUT', data);
}

export const deleteCategory = (category) => {
    return fetchData(`category/${category}`, 'DELETE');
}