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
    axios.get(CONFIG.AUTH.SESSION, { 
      ...CONFIG.AXIOS_CONFIG,
      withCredentials: true // Added
    })
    .then((res) => {
      if (res.data.user) {
        console.log("✅ Active Session:", res.data);
        navigate("/dashboard");
      }
    })
    .catch((err) =>
      console.error("❌ Session Error:", err.response ? err.response.data : err)
    );
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        CONFIG.AUTH.LOGIN,
        { email, password },
        { 
          ...CONFIG.AXIOS_CONFIG,
          withCredentials: true // Added
        }
      );

      console.log("✅ Login Successful:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login Error:", err.response ? err.response.data : err);
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