import { fetchData } from "src/helpers/helpers";

export const createDiscount = (data) => {
    return fetchData(`discount`, 'POST', data);
}

export const deleteDiscount = (id) => {
    return fetchData(`discount/${id}`, 'DELETE');
}