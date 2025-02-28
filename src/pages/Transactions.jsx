import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CONFIG from "../config";
import "../styles/global.css";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const userRole = localStorage.getItem("role"); // Get role from local storage
    const userId = localStorage.getItem("userId"); // Get user ID for filtering

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            let url = `${CONFIG.API_URL}/transactions`;
            if (userRole !== "admin") {
                url += `?userId=${userId}`;
            }
            const response = await axios.get(url);
            setTransactions(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching transactions. Please try again later.");
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "status completed";
            case "pending":
                return "status pending";
            case "failed":
                return "status failed";
            default:
                return "status";
        }
    };

    return (
        <div className="transactions-container">
            <Sidebar />
            <div className="main-content">
                <TopBar />
                <div className="transactions-page">
                    <h2>Transaction History</h2>

                    {error && <p className="error-message">{error}</p>}
                    {loading && <p>Loading transactions...</p>}

                    {!loading && !error && transactions.length > 0 ? (
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx._id}>
                                        <td>{new Date(tx.created_at).toLocaleString()}</td>
                                        <td>₹{tx.amount}</td>
                                        <td className={getStatusClass(tx.status)}>{tx.status}</td>
                                        <td>{userRole === "admin" ? tx.user_id?.name || "N/A" : "You"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        !loading && <p>No transactions found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Transactions;