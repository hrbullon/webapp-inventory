import { fetchData } from "src/helpers/helpers";

export const findAllByCheckoutSessionId = (checkoutSessionId) => {
    return fetchData(`checkout_register/${checkoutSessionId}`, 'GET');
}

export const checkStartedTransaction = (checkoutId) => {
    return fetchData(`checkout_register/check/${checkoutId}`, 'GET');
}
