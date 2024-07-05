import { fetchData } from "src/helpers/helpers";

export const getAllPaymentMethods = () => {
    return fetchData(`payment_methods`, 'GET');
}

