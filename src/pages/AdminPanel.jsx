import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://ng-fin-manager.onrender.com/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map(user => <li key={user._id}>{user.name} - {user.role}</li>)}
      </ul>
    </div>
  );
}

export default AdminPanel;