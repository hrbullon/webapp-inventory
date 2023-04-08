import { fetchData } from "src/helpers/helpers";

const API_URL = "http://localhost:8000";

export const getAllSales = () => {
    return fetchData(`${API_URL}/sales`, 'GET');
}

export const getAllSalesToday = () => {
    return fetchData(`${API_URL}/sales/today`, 'GET');
}

export const getAllSalesMonth = () => {
    return fetchData(`${API_URL}/sales/month`, 'GET');
}

export const createSale = (data) => {
    return fetchData(`${API_URL}/sales`, 'POST', data);
}
