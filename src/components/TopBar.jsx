import { Link } from "react-router-dom";
import { Notifications, AccountCircle } from "@mui/icons-material";
import "../styles/global.css";

function TopBar() {
  return (
    <header className="topbar">
      <div className="logo">NG-FIN-MANAGER</div>
      <div className="right-section">
        <Notifications className="icon" titleAccess="Notifications" />
        <AccountCircle className="icon" titleAccess="User Profile" />
        <Link to="/logout" className="icon">🚪</Link>
      </div>
    </header>
  );
}

export default TopBar;