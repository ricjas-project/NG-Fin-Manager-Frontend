import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/global.css";

function Sidebar({ role }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(window.location.pathname); // ✅ Track current page

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleNavigation = (path) => {
    if (currentPath !== path) {  // ✅ Prevent reloading same page
      setCurrentPath(path);
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setTimeout(() => { 
      navigate("/");
    }, 100);
  };

  return (
    <nav className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "▶" : "◀"}
      </button>

      <ul>
        <li><Link onClick={() => handleNavigation("/dashboard")}>📊 Dashboard</Link></li>
        {role === "admin" && <li><Link onClick={() => handleNavigation("/admin")}>🔧 Admin Panel</Link></li>}
        <li><Link onClick={() => handleNavigation("/transactions")}>💰 Transactions</Link></li>
        <li><Link onClick={() => handleNavigation("/settings")}>⚙️ Settings</Link></li>

        {/* ✅ API Services (Admin Only) */}
        {role === "admin" && (
          <>
            <li><Link onClick={() => handleNavigation("/fake-kyc")}>🆔 Fake KYC</Link></li>
            <li><Link onClick={() => handleNavigation("/iban-validation")}>🏦 IBAN Validation</Link></li>
            <li><Link onClick={() => handleNavigation("/send-sms")}>📩 Send SMS</Link></li>
            <li><Link onClick={() => handleNavigation("/exchange-rate")}>💱 Exchange Rate</Link></li>
            <li><Link onClick={() => handleNavigation("/ip-geolocation")}>🌍 IP Geolocation</Link></li>
            <li><Link onClick={() => handleNavigation("/bank-verification")}>🏛️ Bank Verification</Link></li>
            <li><Link onClick={() => handleNavigation("/audit-logs")}>📜 Audit Logs</Link></li>
            <li><Link onClick={() => handleNavigation("/dmt")}>🔄 DMT 2.0</Link></li>
            <li><Link onClick={() => handleNavigation("/aeps")}>🛡️ AePS Transactions</Link></li>
            <li><Link onClick={() => handleNavigation("/pan-verification")}>🆔 PAN Verification</Link></li>
          </>
        )}
      </ul>

      <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
    </nav>
  );
}

export default Sidebar;