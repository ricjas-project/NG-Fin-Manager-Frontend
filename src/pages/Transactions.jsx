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

    // ✅ Fetch transactions on component load
    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`${CONFIG.API_URL}/transactions`);
            setTransactions(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching transactions. Please try again later.");
            setLoading(false);
        }
    };

    // ✅ Function to style transaction status
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

                    {/* ✅ Show error message if any */}
                    {error && <p className="error-message">{error}</p>}

                    {/* ✅ Display loading message */}
                    {loading && <p>Loading transactions...</p>}

                    {/* ✅ Display transaction table */}
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
                                        <td>{tx.user_id?.name || "N/A"}</td>
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