import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/global.css";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "▶" : "◀"}
      </button>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/settings">Settings</Link></li>
	<li><Link to="/iban-validation">IBAN Validation</Link></li> 
      </ul>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Sidebar;