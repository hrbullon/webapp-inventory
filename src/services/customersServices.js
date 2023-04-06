import { fetchData } from "src/helpers/helpers";

const API_URL = "http://localhost:8000";

export const getAllCustomers = () => {
    return fetchData(`${API_URL}/customers`, 'GET');
}

export const getCustomerById = (id) => {
    return fetchData(`${API_URL}/customer/${id}`, 'GET');
}

export const getCustomerByDni = (dni) => {
    return fetchData(`${API_URL}/customer/dni/${dni}`, 'GET');
}

export const createCustomer = (data) => {
    return fetchData(`${API_URL}/customer`, 'POST', data);
}

export const updateCustomer = (id, data) => {
    return fetchData(`${API_URL}/customer/${id}`, 'PUT', data);
}

export const deleteCustomer = (customer) => {
    return fetchData(`${API_URL}/customer/${customer}`, 'DELETE');
}