import axios from "axios";

const adminUrl = 'http://localhost:5000/admin'

export const getUser = async (id) => {
    id = id || '';
    return await axios.get(`${adminUrl}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(`${adminUrl}/add`, user)
}

export const deleteUser = async (id) => {
    return await axios.delete(`${adminUrl}/${id}`)
}

export const editUser = async (id, user) => {
    return await axios.put(`${adminUrl}/${id}`, user)
}