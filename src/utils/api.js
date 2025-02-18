import axios from "axios";

// Use environment variable for API base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// Axios Instance with CORS Support
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Allow cookies & authentication
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Transactions Function
export const fetchTransactions = async () => {
  try {
    const response = await apiClient.get("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};