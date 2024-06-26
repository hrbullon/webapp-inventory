import { fetchData } from "src/helpers/helpers";

export const getAllPaymentsBySale = (saleId) => {
    return fetchData(`payments/${saleId}`, 'GET');
}

export const createPayment = (data) => {
    return fetchData(`payment`, 'POST', data);
}

export const deletePayment = (payment) => {
    return fetchData(`payment/${payment}`, 'DELETE');
}

export const getPaymentSummary = (checkoutId, date) => {
    return fetchData(`payments/summary/${ checkoutId }/${ date }`, 'GET');
}
