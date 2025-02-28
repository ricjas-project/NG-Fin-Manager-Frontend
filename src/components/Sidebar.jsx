import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/global.css";

function Sidebar({ role }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    navigate("/");
  };

  return (
    <nav className={sidebar `${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "▶" : "◀"}
      </button>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>

        {role === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/settings">Settings</Link></li>
{userRole === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
        {userRole === "admin" && <li><Link to="/fake-kyc">Fake KYC</Link></li>}
        {userRole === "admin" && <li><Link to="/iban-validation">IBAN Validation</Link></li>}
        {userRole === "admin" && <li><Link to="/send-sms">Send SMS</Link></li>}
        {userRole === "admin" && <li><Link to="/exchange-rate">Exchange Rate</Link></li>}
	</ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}
export default Sidebar;