import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CONFIG from "../config";

function ApiServices() {
  const [fakeKYC, setFakeKYC] = useState(null);
  const [ibanValidation, setIbanValidation] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [smsStatus, setSmsStatus] = useState("");
  const [ekoResponse, setEkoResponse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFakeKYC();
    fetchExchangeRate();
    fetchUserLocation();
  }, []);

  // ✅ Fetch Fake KYC Data
  const fetchFakeKYC = async () => {
    try {
      const response = await axios.get(CONFIG.API_SERVICES.FAKE_KYC);
      setFakeKYC(response.data);
    } catch (err) {
      setError("Error fetching Fake KYC data");
    }
  };

  // ✅ Validate IBAN
  const validateIBAN = async () => {
    const iban = prompt("Enter IBAN to validate:");
    if (!iban) return;
    try {
      const response = await axios.get(`${CONFIG.API_SERVICES.IBAN_VALIDATION}/${iban}`);
      setIbanValidation(response.data);
    } catch (err) {
      setError("Error validating IBAN");
    }
  };

  // ✅ Fetch Exchange Rate
  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(CONFIG.API_SERVICES.EXCHANGE_RATE);
      setExchangeRate(response.data);
    } catch (err) {
      setError("Error fetching exchange rate");
    }
  };

  // ✅ Fetch User Location
  const fetchUserLocation = async () => {
    try {
      const response = await axios.get(CONFIG.API_SERVICES.GEO_LOCATION);
      setUserLocation(response.data);
    } catch (err) {
      setError("Error fetching user location");
    }
  };

  // ✅ Send SMS
  const sendSMS = async () => {
    const number = prompt("Enter phone number:");
    const message = prompt("Enter message:");
    if (!number || !message) return;
    try {
      const response = await axios.post(CONFIG.API_SERVICES.SEND_SMS, { phone: number, message });
      setSmsStatus(response.data);
    } catch (err) {
      setError("Error sending SMS");
    }
  };

  // ✅ Call EKO API
  const callEkoAPI = async () => {
    try {
      const response = await axios.get(CONFIG.API_SERVICES.EKO_API);
      setEkoResponse(response.data);
    } catch (err) {
      setError("Error calling EKO API");
    }
  };

  return (
    <div className="api-services-container">
      <TopBar />
      <Sidebar />
      <div className="main-content">
        <h2>API Services</h2>

        {/* ✅ Fake KYC Data */}
        <h3>Fake KYC</h3>
        {fakeKYC ? <pre>{JSON.stringify(fakeKYC, null, 2)}</pre> : <p>Loading...</p>}

        {/* ✅ Validate IBAN */}
        <h3>IBAN Validation</h3>
        <button onClick={validateIBAN}>Validate IBAN</button>
        {ibanValidation && <pre>{JSON.stringify(ibanValidation, null, 2)}</pre>}

        {/* ✅ Exchange Rate */}
        <h3>Exchange Rate</h3>
        {exchangeRate ? <pre>{JSON.stringify(exchangeRate, null, 2)}</pre> : <p>Loading...</p>}

        {/* ✅ User Location */}
        <h3>User Location</h3>
        {userLocation ? <pre>{JSON.stringify(userLocation, null, 2)}</pre> : <p>Loading...</p>}

        {/* ✅ Send SMS */}
        <h3>Send SMS</h3>
        <button onClick={sendSMS}>Send SMS</button>
        {smsStatus && <p>{smsStatus.message}</p>}

        {/* ✅ EKO API */}
        <h3>EKO API</h3>
        <button onClick={callEkoAPI}>Call EKO API</button>
        {ekoResponse && <pre>{JSON.stringify(ekoResponse, null, 2)}</pre>}

        {/* ✅ Error Message */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ApiServices;