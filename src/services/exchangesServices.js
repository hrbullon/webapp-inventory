import { fetchData } from "src/helpers/helpers";

export const getLastExchange = () => {
    return  fetchData(`exchanges/1`, 'GET');
}

export const getAllExchanges = (data) => {
    let params = new URLSearchParams(data).toString();
    return  fetchData(`exchanges?${params}`, 'GET');
}

export const createExchange = (data) => {
    return fetchData(`exchange`, 'POST', data);
}

export const updateExchange = (id, data) => {
    return fetchData(`exchange/${id}`, 'PUT', data);
}

export const deleteExchange = (exchange) => {
    return fetchData(`exchange/${exchange}`, 'DELETE');
}
