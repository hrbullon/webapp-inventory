import { fetchData } from "src/helpers/helpers";

export const getAllCustomers = (data) => {
    let params = new URLSearchParams(data).toString();
    return fetchData(`customers?${params}`, 'GET');
}

export const getCustomerById = (id) => {
    return fetchData(`customer/${id}`, 'GET');
}

export const getCustomerByDni = (dni) => {
    return fetchData(`customer/dni/${dni}`, 'GET');
}

export const createCustomer = (data) => {
    return fetchData(`customer`, 'POST', data);
}

export const updateCustomer = (id, data) => {
    return fetchData(`customer/${id}`, 'PUT', data);
}

export const deleteCustomer = (customer) => {
    return fetchData(`customer/${customer}`, 'DELETE');
}