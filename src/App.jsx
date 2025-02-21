import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/global.css"; // Import global styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-user" element={<AddUser />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;