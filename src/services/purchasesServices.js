import { fetchData } from "src/helpers/helpers";

export const getAllPurchases = () => {
    return fetchData(`purchases`, 'GET');
}

export const createPurchase = (data) => {
    return fetchData(`purchases`, 'POST', data);
}

export const deletePurchase = (id) => {
    return fetchData(`purchases/${id}`, 'DELETE');
}
