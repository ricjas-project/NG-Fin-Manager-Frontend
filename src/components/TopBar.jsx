import "../styles/global.css";
function TopBar({ user }) {
  return (
    <header className="topbar">
      <div className="logo">NG-FIN-MANAGER</div>
      <div className="right-section">
        <span>{user?.name} ({user?.role})</span>
        <button onClick={() => localStorage.removeItem("token")}>Logout</button>
      </div>
    </header>
  );
}
export default TopBar;