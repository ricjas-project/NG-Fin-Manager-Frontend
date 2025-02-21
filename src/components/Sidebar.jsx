import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "☰" : "✖"}
      </button>

      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/admin">Admin Panel</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;