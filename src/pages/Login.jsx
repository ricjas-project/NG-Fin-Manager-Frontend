import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CONFIG from "../config";
import "../styles/global.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard"); // ✅ Fix: Redirects instantly if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${CONFIG.API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); // ✅ Fix: Store user role
      navigate("/dashboard"); // ✅ Fix: Redirect instantly after login
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to NG-FIN-MANAGER 2</h2>
        <img src="/logo.png" alt="Logo" className="logo" />
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;