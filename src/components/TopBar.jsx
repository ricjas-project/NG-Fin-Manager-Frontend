import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../styles/global.css";

function TopBar() {
  const { user, logout } = useUser();

  return (
    <>
      <div className="header1">
        <div className="logo-container">
          <h2>NG-FIN-MANAGER 2</h2>
          <div className="user-profile">
            <span>{user?.name}</span>
            <small>({user?.role})</small>
          </div>
        </div>
      </div>

      <div className="header3">
        <h1>Financial Management System</h1>
        <small>Active Service: Payment Gateway API</small>
      </div>

      <div className="header2">
        <button className="report-btn admin-only">
          {user?.role === 'admin' ? 'System Reports' : 'My Reports'}
        </button>
        <button onClick={logout} className="logout-btn">
          ⏏ Logout
        </button>
      </div>
    </>
  );
}

export default TopBar;