import { fetchData } from "src/helpers/helpers";

export const getAllCheckouts = () => {
    return fetchData(`checkouts`, 'GET');
}

