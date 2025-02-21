import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users
    axios
      .get("https://ng-fin-manager.onrender.com/api/users/list")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));

    // Fetch transactions
    axios
      .get("https://ng-fin-manager.onrender.com/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch(() => setTransactions([]));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-section">
        <h3>User Management</h3>
        <button onClick={() => navigate("/add-user")}>Add User</button>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.map((tx) => (
            <li key={tx._id}>
              ₹{tx.amount} - {tx.status} - {new Date(tx.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/reports")}>View Reports</button>
      </div>
    </div>
  );
}

export default Dashboard;