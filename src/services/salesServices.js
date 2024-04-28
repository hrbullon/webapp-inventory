import { fetchData } from "src/helpers/helpers";

export const getAllSales = (data) => {
    let params = new URLSearchParams(data).toString();
    return fetchData(`sales?${params}`, 'GET');
}

export const getAllSalesToday = (data) => {
    let params = new URLSearchParams(data).toString();
    return fetchData(`sales/today?${params}`, 'GET');
}

export const getAllSalesMonth = (data) => {
    let params = new URLSearchParams(data).toString();
    return fetchData(`sales/month?${params}`, 'GET');
}

export const createSale = (data) => {
    return fetchData(`sales`, 'POST', data);
}

export const deleteSale = (id) => {
    return fetchData(`sales/${id}`, 'DELETE');
}

export const closeSale = (data) => {
    return fetchData(`sales/close`, 'POST', data);
}

export const getSalesSummary = (checkoutId, date) => {
    return fetchData(`sales/summary/${ checkoutId }/${ date }`, 'GET');
}

