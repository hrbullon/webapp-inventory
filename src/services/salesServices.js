import { fetchData } from "src/helpers/helpers";

export const getAllSales = (data) => {
    let params = new URLSearchParams(data).toString();
    return fetchData(`sales?${params}`, 'GET');
}

export const getAllSalesToday = () => {
    return fetchData(`sales/today`, 'GET');
}

export const getAllSalesMonth = () => {
    return fetchData(`sales/month`, 'GET');
}

export const createSale = (data) => {
    return fetchData(`sales`, 'POST', data);
}

export const deleteSale = (id) => {
    return fetchData(`sales/${id}`, 'DELETE');
}

