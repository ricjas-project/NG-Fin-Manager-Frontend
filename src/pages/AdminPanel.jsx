import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CONFIG from "../config"; // ✅ Import Config File
import "../styles/global.css";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // ✅ Fetch users on component load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(CONFIG.USERS.GET_ALL);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching users. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post(CONFIG.USERS.ADD_USER, newUser);
      fetchUsers(); // Refresh user list
      alert("User added successfully!");
      setNewUser({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      alert("Error adding user. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${CONFIG.USERS.DELETE_USER}/${userId}`);
      fetchUsers(); // Refresh user list
    } catch (err) {
      alert("Error deleting user. Please try again.");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="admin-panel">
          <h2>Admin Panel</h2>

          {/* ✅ Display loading message */}
          {loading && <p>Loading users...</p>}

          {/* ✅ Display error message */}
          {error && <p className="error-message">{error}</p>}

          {/* ✅ User Management Table */}
          {!loading && !error && users.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user._id)}>❌ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && <p>No users found.</p>
          )}

          {/* ✅ Add New User Section */}
          <h3>Add New User</h3>
          <div className="add-user-form">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleAddUser}>Add User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;