import { fetchData } from "src/helpers/helpers";

export const login= (data) => {
    return fetchData(`auth/login`, 'POST', data);
}