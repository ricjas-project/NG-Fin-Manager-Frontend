import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "ricjas@live.com" && password === "Ricky@123") {
      navigate("/dashboard");
    } else {
      setError("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>NG-FIN-MANAGER 2 - Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Login;