import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import axios from "axios";
import CONFIG from "../config";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect if user is not logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    // ✅ Fetch Users & Transactions
    fetchUsers();
    fetchTransactions();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(CONFIG.USERS.GET_ALL);
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(CONFIG.TRANSACTIONS.GET_ALL);
      setTransactions(res.data);
    } catch {
      setTransactions([]);
    }
  };

  return (
    <div>
      <TopBar />
      <Sidebar />
      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>

        {/* ✅ User Management Section */}
        <h3>User Management</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))}
        </ul>

        {/* ✅ Recent Transactions Section */}
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.map((tx) => (
            <li key={tx._id}>
              {tx.amount} - {tx.status} - {new Date(tx.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>

        {/* ✅ Reports Button */}
        <button onClick={() => navigate("/reports")}>View Reports</button>
      </div>
    </div>
  );
}

export default Dashboard;