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