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
  const [apiStatuses, setApiStatuses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
      return;
    }

    const fetchData = async () => {
      try {
        const [usersRes, transactionsRes] = await Promise.all([
          axios.get(CONFIG.USERS.GET_ALL),
          axios.get(CONFIG.TRANSACTIONS.GET_ALL),
        ]);
        setUsers(usersRes.data);
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const checkAPIs = async () => {
      const apis = {
        FakeKYC: `${CONFIG.API_URL}/api/fake-kyc`,
        IBANValidation: `${CONFIG.API_URL}/api/validate-iban/DE89370400440532013000`,
        SendSMS: `${CONFIG.API_URL}/api/send-sms`,
        ExchangeRate: `${CONFIG.API_URL}/api/exchange-rate/USD`,
        Geolocation: `${CONFIG.API_URL}/api/user-location`,
        EKOTransfer: `${CONFIG.API_URL}/api/transfer-money`,
      };

      const statusResults = {};
      for (const [name, url] of Object.entries(apis)) {
        try {
          await axios.get(url);
          statusResults[name] = "✅ Available";
        } catch (error) {
          statusResults[name] = "❌ Unavailable";
        }
      }
      setApiStatuses(statusResults);
    };

    fetchData();
    checkAPIs();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

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

            {/* Transactions Card */}
            <Grid item xs={12} md={6}>
              <Card>
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

            {/* API Links Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>API Integrations</Typography>
                  <Divider />
                  <List dense>
                    {Object.entries(apiStatuses).map(([apiName, status]) => (
                      <ListItem key={apiName}>
                        <ListItemText primary={apiName} secondary={status} />
                        <Button variant="contained" color="primary" onClick={() => window.open(CONFIG.API_URL + `/api/${apiName.toLowerCase()}`, "_blank")}>
                          Test API
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Logout Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="error" onClick={handleLogout} fullWidth>
                Logout
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;