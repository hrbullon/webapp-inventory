import { fetchData } from "src/helpers/helpers";

export const getAllTransactionsBySession = (checkoutSessionId) => {
    return fetchData(`checkout_register/${checkoutSessionId}`, 'GET');
}

export const createTransaction = (data) => {
    return fetchData(`transaction`, 'POST', data);
}

export const checkStartedTransaction = (checkoutId) => {
    return fetchData(`transaction/check/${checkoutId}`, 'GET');
}

export const getTransactionSummary = (sessionPOS, date) => {
    return fetchData(`transaction/summary/${sessionPOS}/${date}`, 'GET');
}

export const closeTransactionCheckout = (checkoutSessionId) => {
    const data = { checkoutSessionId };
    return fetchData(`transaction/checkout/close`, 'POST', data);
}