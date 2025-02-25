import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
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
    if (!localStorage.getItem("token")) navigate("/");
    
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
    fetchData();

    // ✅ Check API Statuses
    const checkApis = async () => {
      const apis = [
        { name: "Fake KYC", url: `${CONFIG.API_URL}/api/fake-kyc` },
        { name: "IBAN Validation", url: `${CONFIG.API_URL}/api/validate-iban/DE89370400440532013000` },
        { name: "Send SMS", url: `${CONFIG.API_URL}/api/send-sms` },
        { name: "Exchange Rate", url: `${CONFIG.API_URL}/api/exchange-rate/USD` },
        { name: "EKO Transfer", url: `${CONFIG.API_URL}/api/transfer-money` },
      ];

      const statuses = {};
      for (const api of apis) {
        try {
          await axios.get(api.url);
          statuses[api.name] = "Available";
        } catch {
          statuses[api.name] = "Unavailable";
        }
      }
      setApiStatuses(statuses);
    };
    checkApis();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-wrapper">
          <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

          {/* ✅ API Integrations */}
          <Card>
            <CardContent>
              <Typography variant="h6">API Integrations</Typography>
              <List>
                {Object.keys(apiStatuses).map((apiName) => (
                  <ListItem key={apiName}>
                    <ListItemText primary={apiName} secondary={apiStatuses[apiName]} />
                    <Button
                      variant="contained"
                      onClick={() => window.open(`${CONFIG.API_URL}/api/${apiName.toLowerCase().replace(/ /g, "-")}`, "_self")}
                      disabled={apiStatuses[apiName] === "Unavailable"}
                    >
                      TEST API
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;