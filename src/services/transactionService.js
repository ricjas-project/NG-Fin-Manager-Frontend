import axios from "axios";
import CONFIG from "../config";

const API_URL = `${CONFIG.API_URL}/transactions`;

// ✅ Fetch All Transactions
export const fetchTransactions = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

// ✅ Initiate a New Transaction
export const initiateTransaction = async (transactionData) => {
    const response = await axios.post(`${API_URL}/initiate`, transactionData);
    return response.data;
};

// ✅ Check Transaction Status
export const checkTransactionStatus = async (transactionId) => {
    const response = await axios.get(`${API_URL}/status/${transactionId}`);
    return response.data;
};

// ✅ Cancel a Transaction
export const cancelTransaction = async (transactionId) => {
    const response = await axios.delete(`${API_URL}/cancel/${transactionId}`);
    return response.data;
};