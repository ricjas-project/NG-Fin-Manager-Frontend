import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import axios from "axios";
import CONFIG from "../config"; // ✅ Import Config File

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect to login if no user is stored in localStorage
    if (!localStorage.getItem("user")) {
      navigate("/");
    }

    // ✅ Fetch Users
    axios
      .get(CONFIG.USERS.GET_ALL)
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));

    // ✅ Fetch Transactions
    axios
      .get(CONFIG.TRANSACTIONS.GET_ALL)
      .then((res) => setTransactions(res.data))
      .catch(() => setTransactions([]));
  }, [navigate]);

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