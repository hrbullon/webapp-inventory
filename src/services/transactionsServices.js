import { fetchData } from "src/helpers/helpers";

export const getAllTransactionsByCheckoutId = (checkoutId) => {
    return fetchData(`transactions/${checkoutId}`, 'GET');
}

export const createTransaction = (data) => {
    return fetchData(`transaction`, 'POST', data);
}

export const checkStartedTransaction = (checkoutId) => {
    return fetchData(`transaction/check/${checkoutId}`, 'GET');
}