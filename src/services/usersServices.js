import { fetchData } from "src/helpers/helpers";

export const getAllUsers = () => {
    return  fetchData(`users`, 'GET');
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
    let action = (user.state)? "0" : "1";
    return fetchData(`user/${action}/${user.id}`, 'DELETE');
}