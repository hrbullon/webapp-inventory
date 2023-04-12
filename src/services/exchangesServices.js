import { fetchData } from "src/helpers/helpers";

export const getLastExchange = () => {
    return  fetchData(`exchanges/1`, 'GET');
}

export const getAllExchanges = () => {
    return  fetchData(`exchanges`, 'GET');
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
