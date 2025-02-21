import { useState } from "react"; 
import axios from "axios";

function AddUser()
 { const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });

const handleSubmit = async (e) => { e.preventDefault(); 

try 

{ 
await axios.post("https://ng-fin-manager.onrender.com/api/users/add", form); alert("User added successfully");
 } 
catch (error) 
{ 
alert("Error adding user");
 } 
};

return ( 
<form onSubmit={handleSubmit}> 
<input type="text" placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} /> 
<input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} /> 
<input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} /> 
<select onChange={e => setForm({...form, role: e.target.value})}> 
<option value="user">User</option> 
<option value="admin">Admin</option> 
</select> 
<button type="submit">Add User</button> 
</form> 
); 
} 
export default AddUser;
