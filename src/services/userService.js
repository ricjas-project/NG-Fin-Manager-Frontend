import axios from "axios";
import CONFIG from "../config";

const API_URL = `${CONFIG.API_URL}/users`;

// ✅ Fetch All Users
export const fetchUsers = async () => {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
};

// ✅ Add New User
export const addUser = async (userData) => {
    const response = await axios.post(`${API_URL}/add`, userData);
    return response.data;
};

// ✅ Delete User
export const deleteUser = async (userId) => {
    const response = await axios.delete(`${API_URL}/delete/${userId}`);
    return response.data;
};

// ✅ Update User
export const updateUser = async (userId, userData) => {
    const response = await axios.put(`${API_URL}/update/${userId}`, userData);
    return response.data;
};