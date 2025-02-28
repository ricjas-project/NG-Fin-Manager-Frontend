import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import axios from "axios";
import CONFIG from "../config";
import "../styles/global.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    axios.get(`${CONFIG.API_URL}/user/me`, { headers: { Authorization: token }})
      .then((res) => setUser(res.data))
      .catch(() => navigate("/"));
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar role={user?.role} />
      <div className="main-content">
        <TopBar user={user} />
        <div className="content-wrapper">
          <h2>Welcome, {user?.name}</h2>
          <p>Your role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;