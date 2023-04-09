import { fetchData } from "src/helpers/helpers";

export const getLastExchange = () => {
    return  fetchData(`exchanges/1`, 'GET');
}
