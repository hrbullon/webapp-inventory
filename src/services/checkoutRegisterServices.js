import { fetchData } from "src/helpers/helpers";

export const findAllByCheckoutSessionId = (checkoutSessionId) => {
    return fetchData(`checkout_register/${checkoutSessionId}`, 'GET');
}

export const getCheckoutRegisterSummary = (checkoutSessionId) => {
    return fetchData(`checkout_register/summary/${checkoutSessionId}`, 'GET');
}

export const checkStartedTransaction = (checkoutId) => {
    return fetchData(`checkout_register/check/${checkoutId}`, 'GET');
}

export const createCheckoutOpen = (data) => {
    return fetchData(`checkout_register/create_checkout_open`, 'POST', data);
}

export const createInAndOutCash = (data) => {
    return fetchData(`checkout_register/create_cash_transaction`, 'POST', data);
}
