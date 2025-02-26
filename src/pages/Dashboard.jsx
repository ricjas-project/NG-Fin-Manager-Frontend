import { Grid, Card, CardContent, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { useUser } from "../context/UserContext";
import "../styles/global.css";

function Dashboard() {
  const { user } = useUser();

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        
        <Grid container spacing={3} className="content-grid">
          {/* Role-based Welcome */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Welcome {user?.name} ({user?.role?.toUpperCase()})
            </Typography>
          </Grid>

          {/* Key Metrics */}
          <Grid item xs={12} md={user?.role === 'admin' ? 6 : 12}>
            <Card className="metric-card">
              <CardContent>
                <Typography variant="h6">Total Transactions</Typography>
                <Typography variant="h3">₹12,45,678</Typography>
              </CardContent>
            </Card>
          </Grid>

          {user?.role === 'admin' && (
            <Grid item xs={12} md={6}>
              <Card className="metric-card">
                <CardContent>
                  <Typography variant="h6">Active Users</Typography>
                  <Typography variant="h3">42</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default Dashboard;