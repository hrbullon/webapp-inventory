import { fetchData } from "src/helpers/helpers";

export const findAllByCheckoutSessionId = (checkoutSessionId) => {
    return fetchData(`checkout_register/${checkoutSessionId}`, 'GET');
}
