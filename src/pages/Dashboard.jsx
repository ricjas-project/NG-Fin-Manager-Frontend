import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Button, Divider } from "@mui/material";
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
            {/* ✅ Users Card */}
            <Grid item xs={12} md={6}>
              <Card className="dashboard-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>User Management</Typography>
                  <List dense>
                    {users.length > 0 ? users.map(user => (
                      <ListItem key={user._id}>
                        <ListItemText 
                          primary={user.name} 
                          secondary={`${user.email} (${user.role})`} 
                        />
                      </ListItem>
                    )) : <Typography>No users found</Typography>}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* ✅ Transactions Card */}
            <Grid item xs={12} md={6}>
              <Card className="dashboard-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
                  <List dense>
                    {transactions.length > 0 ? transactions.map(tx => (
                      <ListItem key={tx._id}>
                        <ListItemText
                          primary={`₹${tx.amount}`}
                          secondary={`${tx.status} - ${new Date(tx.created_at).toLocaleDateString()}`}
                        />
                      </ListItem>
                    )) : <Typography>No transactions found</Typography>}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* ✅ API Integrations Section */}
            <Grid item xs={12}>
              <Card className="dashboard-card">
                <CardContent>
                  <Typography variant="h6" gutterBottom>API Integrations</Typography>
                  <Divider sx={{ marginBottom: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                      <Button variant="contained" fullWidth href={`${CONFIG.API_URL}/api/fake-kyc`} target="_blank">
                        Fake KYC API
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Button variant="contained" fullWidth href={`${CONFIG.API_URL}/api/validate-iban/123456`} target="_blank">
                        IBAN Validation API
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Button variant="contained" fullWidth href={`${CONFIG.API_URL}/api/send-sms`} target="_blank">
                        Send SMS API
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Button variant="contained" fullWidth href={`${CONFIG.API_URL}/api/exchange-rate/USD`} target="_blank">
                        Exchange Rate API
                      </Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Button variant="contained" fullWidth href={`${CONFIG.API_URL}/api/user-location/8.8.8.8`} target="_blank">
                        IP Geolocation API
                      </Button>
                    </Grid>
                  </Grid>
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