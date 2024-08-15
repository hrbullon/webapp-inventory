import { fetchData } from "src/helpers/helpers";

export const getDiscountsBySale = (saleId) => {
    return fetchData(`discounts/${saleId}`, 'GET');
}

export const createDiscount = (data) => {
    return fetchData(`discount`, 'POST', data);
}

export const deleteDiscount = (id) => {
    return fetchData(`discount/${id}`, 'DELETE');
}