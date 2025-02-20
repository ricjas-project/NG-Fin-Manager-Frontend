import { useEffect, useState } from "react"; 
import axios from "axios";

function Dashboard() 
{ 
const [users, setUsers] = useState([]);

useEffect(() => 
{ axios.get("https://ng-fin-manager.onrender.com/api/users/list") 
.then((res) => setUsers(res.data)) 
.catch(() => setUsers([])); 
}, 
[]);

return 
( 
<div> 
<h2>Admin Dashboard</h2> 
<h3>User List:</h3>
<h4>User Management</h4> 
<ul> 
{users.map((user) => ( 
<li key={user._id}>{user.name} - {user.email} - {user.role}</li>
 ))} 
</ul> 
</div> 
); 
}

export default Dashboard;