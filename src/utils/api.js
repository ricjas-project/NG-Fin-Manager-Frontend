import axios from "axios";
import CONFIG from "../config";

const apiClient = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true, // Added
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
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

// Fetch User Session
export const fetchUserSession = async () => {
  try {
    const response = await apiClient.get(CONFIG.AUTH.SESSION);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log("No active session");
      return null;
    }
    console.error("Session fetch error:", error);
    throw error;
  }
};