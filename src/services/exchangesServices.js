import { fetchData } from "src/helpers/helpers";

const API_URL = "http://localhost:8000";

export const getLastExchange = () => {
    return  fetchData(`${API_URL}/exchanges/1`, 'GET');
}
