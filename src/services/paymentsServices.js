import { fetchData } from "src/helpers/helpers";

export const getAllPaymentsBySale = (saleId) => {
    return fetchData(`payments/${saleId}`, 'GET');
}

export const createPayment = (data) => {
    return fetchData(`payment`, 'POST', data);
}

export const deletePayment = (payment, saleId) => {
    return fetchData(`payment/${payment}/${saleId}`, 'DELETE');
}

export const getPaymentSummary = (checkoutSessionId) => {
    return fetchData(`payments/summary/${ checkoutSessionId }`, 'GET');
}
