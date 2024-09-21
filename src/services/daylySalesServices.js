import { fetchData } from "src/helpers/helpers";

export const getAllDailySales = (data) => {
    const queryString = new URLSearchParams(data).toString();
    return fetchData(`daily_sales?${queryString}` , 'GET');
}
