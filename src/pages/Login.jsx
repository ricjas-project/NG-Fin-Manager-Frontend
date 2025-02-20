import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

function Login() 
{ 
const [email, setEmail] = useState(""); 
const [password, setPassword] = useState(""); 
const navigate = useNavigate();

const handleLogin = () => 
{ 
if (email === "ricjas" && password === "Ricky@123") 
{ 
navigate("/dashboard"); 
} 
else 
{ 
alert("Invalid Credentials"); 
} };

return 
( <div> 
<h2>Login</h2> 
<input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} /> 
<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> 
<button onClick={handleLogin}>Login</button> 
</div> 
); 
}

export default Login;