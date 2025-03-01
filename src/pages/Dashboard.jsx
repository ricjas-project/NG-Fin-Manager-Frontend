import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import axios from "axios";
import CONFIG from "../config";
import "../styles/global.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // ✅ Prevent multiple calls
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/");  
      return;
    }

    // ✅ Prevent infinite navigation loops
    if (loading) {
      axios.get(`${CONFIG.API_URL}/auth/session`, { 
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");  // ✅ Remove invalid token
        navigate("/");  
      });
    }
  }, [navigate, loading]);  // ✅ Only runs once

  return (
    <div className="dashboard-container">
      <Sidebar role={user?.role} />
      <div className="main-content">
        <TopBar user={user} />
        <div className="content-wrapper">
          <h2>Welcome, {user?.name || "User"}</h2>
          <p>Your role: {user?.role || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;