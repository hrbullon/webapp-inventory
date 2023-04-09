import { fetchData } from "src/helpers/helpers";

export const getAllCategories = () => {
    return  fetchData(`categories`, 'GET');
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