import { fetchData } from "src/helpers/helpers";

export const getCompanyById = (id) => {
    return  fetchData(`companies/${id}`, 'GET');
}

export const updateCompany = (id, data) => {
    return  fetchData(`companies/${id}`, 'PUT', data);
}
