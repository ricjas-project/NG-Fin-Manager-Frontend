import { useState } from "react";
import axios from "axios";
import { Card, CardContent, TextField, Button, Typography, MenuItem } from "@mui/material";
import CONFIG from "../config"; // ✅ Import API URL from config

function ExchangeRate() {
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFetchRates = async () => {
    setError("");
    setResult(null);
    
    try {
      const res = await axios.get(`${CONFIG.API_URL}/exchange-rate/convert/${base}/${target}/${amount}`);
      setResult(res.data);
    } catch (err) {
      setError("Failed to fetch exchange rate. Please try again.");
    }
  };

  return (
    <div className="content-wrapper">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Exchange Rate (Currency Converter)</Typography>
          <TextField
            select
            label="Base Currency"
            variant="outlined"
            fullWidth
            margin="normal"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </TextField>
          <TextField
            select
            label="Target Currency"
            variant="outlined"
            fullWidth
            margin="normal"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </TextField>
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleFetchRates}>
            Convert
          </Button>

          {error && <Typography color="error">{error}</Typography>}
          {result && (
            <Typography color="success">
              {`${amount} ${base} = ${result.conversion_result} ${target}`}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ExchangeRate;