import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import axios from "axios";
import CONFIG from "../config";
import "../styles/global.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    
    const fetchData = async () => {
      try {
        const [usersRes, transactionsRes] = await Promise.all([
          axios.get(CONFIG.USERS.GET_ALL),
          axios.get(CONFIG.TRANSACTIONS.GET_ALL)
        ]);
        setUsers(usersRes.data);
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-wrapper">
          <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
          
          <Grid container spacing={3}>
            {/* Users Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>User Management</Typography>
                  <List dense>
                    {users.map(user => (
                      <ListItem key={user._id}>
                        <ListItemText 
                          primary={user.name}
                          secondary={${user.email} (${user.role})}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Transactions Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
                  <List dense>
                    {transactions.map(tx => (
                      <ListItem key={tx._id}>
                        <ListItemText
                          primary={₹${tx.amount}}
                          secondary={${tx.status} - ${new Date(tx.created_at).toLocaleDateString()}}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
[12:08 pm, 24/2/2025] Jasveer Singh Parmar: import { useState } from "react";
import { TextField, Button, Select, MenuItem, Grid, FormControl, InputLabel, Box } from "@mui/material";
import axios from "axios";

function AddUser() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "user" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://ng-fin-manager.onrender.com/api/users/add", form);
      alert("User added successfully");
    } catch (error) {
      alert("Error adding user: " + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={form.role}
              label="Role"
              onChange={e => setForm({...form, role: e.target.value})}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Add User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddUser;