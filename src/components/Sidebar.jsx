import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/global.css";

function Sidebar({ role }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    navigate("/");
  };

  return (
    <nav className={`sidebar ${collapsed ? "collapsed" : ""}`}> {/* ✅ Fixed Class Name */}
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "▶" : "◀"}
      </button>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {role === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/settings">Settings</Link></li>

        {/* ✅ Show API Links for Admin Only */}
        {role === "admin" && <>
          <li><Link to="/fake-kyc">Fake KYC</Link></li>
          <li><Link to="/iban-validation">IBAN Validation</Link></li>
          <li><Link to="/send-sms">Send SMS</Link></li>
          <li><Link to="/exchange-rate">Exchange Rate</Link></li>
        </>}
      </ul>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Sidebar;