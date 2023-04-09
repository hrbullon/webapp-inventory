import { fetchData } from "src/helpers/helpers";

const API_URL = "http://localhost:8000";

export const getAllUsers = () => {
    return  fetchData(`${API_URL}/users`, 'GET');
}

export const getUserById = (id) => {
    return  fetchData(`${API_URL}/user/${id}`, 'GET');
}

export const createUser= (data) => {
    return fetchData(`${API_URL}/user`, 'POST', data);
}

export const updateUser = (id, data) => {
    return fetchData(`${API_URL}/user/${id}`, 'PUT', data);
}

export const deleteUser = (user) => {
    let action = (user.state)? "0" : "1";
    return fetchData(`${API_URL}/user/${action}/${user.id}`, 'DELETE');
}