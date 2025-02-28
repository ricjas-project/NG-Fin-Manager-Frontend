import { useState } from "react";
import axios from "axios";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import CONFIG from "../config"; // ✅ Import API URL from config

function TextbeltSMS() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSendSMS = async () => {
    setError("");
    setResponse(null);
    
    try {
      const res = await axios.post(`${CONFIG.API_URL}/send-sms`, { phone, message });
      setResponse(res.data);
    } catch (err) {
      setError("Failed to send SMS. Please try again.");
    }
  };

  return (
    <div className="content-wrapper">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Send SMS (Textbelt API)</Typography>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSendSMS}>
            Send SMS
          </Button>

          {error && <Typography color="error">{error}</Typography>}
          {response && <Typography color="success">SMS Sent Successfully!</Typography>}
        </CardContent>
      </Card>
    </div>
  );
}

export default SendSMS;