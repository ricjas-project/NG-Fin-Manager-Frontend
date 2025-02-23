import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./styles/global.css";

function App() {
  // ✅ Check if user is logged in
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar />}
        <div className="main-content">
          {isAuthenticated && <Sidebar />}
          <Routes>
            {/* ✅ Show Login page if not authenticated */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            
            {/* ✅ Protected Routes (Only accessible if logged in) */}
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/settings" element={<Settings />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;