import { fetchData } from "src/helpers/helpers";

export const getAllSales = () => {
    return fetchData(`sales`, 'GET');
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
