import { fetchData } from "src/helpers/helpers";

export const getAllDailySales = () => {
    return fetchData(`daily_sales`, 'GET');
}
