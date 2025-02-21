import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; import Login from "./pages/Login"; 
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import Navbar from "./components/Navbar";
function App() 
{ 
return 
( 
<Router> 
<Routes> 
<Route path="/Navbar" element={<Navbar />} />
<Route path="/" element={<Login />} /> 
<Route path="/dashboard" element={<Dashboard />} /> 
<Route path="/add-user" element={<AddUser />} />
</Routes> 
</Router> 
); 
}

export default App;
