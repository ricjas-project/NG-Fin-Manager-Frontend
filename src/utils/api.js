import axios from "axios";
import CONFIG from "../config";

const apiClient = axios.create({
  baseURL: CONFIG.API_URL,
  ...CONFIG.AXIOS_CONFIG, // ✅ Ensure AXIOS_CONFIG is used globally
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
    console.error("Session fetch error:", error);
    return null;
  }
};