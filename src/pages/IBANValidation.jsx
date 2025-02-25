import { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Card, CardContent } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import "../styles/global.css";

function IBANValidation() {
  const [iban, setIban] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [error, setError] = useState("");

  const validateIBAN = async () => {
    setError("");
    setValidationResult(null);

    if (!iban) {
      setError("Please enter an IBAN.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/iban/validate-iban`, { iban });
      setValidationResult(response.data);
    } catch (err) {
      setError("Error validating IBAN. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-wrapper">
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>IBAN Validation</Typography>
              <TextField
                label="Enter IBAN"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={validateIBAN}>
                Validate IBAN
              </Button>

              {error && <Typography color="error" style={{ marginTop: "1rem" }}>{error}</Typography>}

              {validationResult && (
                <div style={{ marginTop: "1rem" }}>
                  <Typography variant="h6">Validation Result:</Typography>
                  <Typography>Valid: {validationResult.valid ? "Yes" : "No"}</Typography>
                  {validationResult.valid && (
                    <>
                      <Typography>Bank: {validationResult.bank}</Typography>
                      <Typography>Branch: {validationResult.branch}</Typography>
                      <Typography>Address: {validationResult.address}</Typography>
                      <Typography>City: {validationResult.city}</Typography>
                      <Typography>BIC: {validationResult.bic}</Typography>
                      <Typography>SEPA Compliant: {validationResult.sepa ? "Yes" : "No"}</Typography>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default IBANValidation;