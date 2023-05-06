import { fetchData } from "src/helpers/helpers";

export const getAllPurchases = (data) => {
    let params = new URLSearchParams(data).toString();
    return fetchData(`purchases?${params}`, 'GET');
}

export const createPurchase = (data) => {
    return fetchData(`purchases`, 'POST', data);
}

export const deletePurchase = (id) => {
    return fetchData(`purchases/${id}`, 'DELETE');
}
