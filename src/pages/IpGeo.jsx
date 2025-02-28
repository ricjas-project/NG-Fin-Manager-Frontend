import { useState } from "react";
import axios from "axios";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import CONFIG from "../config"; // ✅ Import API URL from config

function IpGeo() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleFetchLocation = async () => {
    setError("");
    setLocation(null);

    try {
      const res = await axios.get(`${CONFIG.API_URL}/user-location/${ip || ""}`);
      setLocation(res.data);
    } catch (err) {
      setError("Failed to fetch IP location. Please try again.");
    }
  };

  return (
    <div className="content-wrapper">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>IP Geolocation</Typography>
          <TextField
            label="Enter IP Address (Optional)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleFetchLocation}>
            Get Location
          </Button>

          {error && <Typography color="error">{error}</Typography>}
          {location && (
            <Typography color="success">
              <strong>IP:</strong> {location.ip} <br />
              <strong>City:</strong> {location.city} <br />
              <strong>Region:</strong> {location.region} <br />
              <strong>Country:</strong> {location.country} <br />
              <strong>ISP:</strong> {location.org}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default IpGeo;