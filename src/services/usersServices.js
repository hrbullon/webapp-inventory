import { fetchData } from "src/helpers/helpers";

export const getAllUsers = (data) => {
    let params = new URLSearchParams(data).toString();
    return  fetchData(`users?${params}`, 'GET');
}

export const getUserById = (id) => {
    return  fetchData(`user/${id}`, 'GET');
}

export const createUser= (data) => {
    return fetchData(`user`, 'POST', data);
}

export const updateUser = (id, data) => {
    return fetchData(`user/${id}`, 'PUT', data);
}

export const deleteUser = (user) => {
    let action = (user.state == 0)? "1" : "0";
    return fetchData(`user/${action}/${user.id}`, 'DELETE');
}