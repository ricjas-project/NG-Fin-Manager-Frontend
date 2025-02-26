import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/global.css";

function Sidebar() {
  const { user } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button 
        className="toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '▶' : '◀'}
      </button>

      <nav>
        <ul>
          {/* Admin Links */}
          <li className="admin-only">
            <Link to="/admin">👥 User Management</Link>
          </li>
          
          {/* Common Links */}
          <li>
            <Link to="/dashboard">📊 Dashboard</Link>
          </li>
          <li>
            <Link to="/transactions">💳 Transactions</Link>
          </li>
          
          {/* User-specific Links */}
          <li className="user-only">
            <Link to="/my-reports">📄 My Reports</Link>
          </li>
          
          {/* API Links */}
          <li className="admin-only">
            <Link to="/api-management">⚙️ API Management</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;