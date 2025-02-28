import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CONFIG from "../config";

function FakeKYC() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchFakeKYC = async () => {
    try {
      const response = await axios.get(`${CONFIG.API_URL}/api/fake-kyc`);
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch KYC data");
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <h2>Fake KYC API</h2>
        <button onClick={fetchFakeKYC}>Fetch KYC Data</button>
        {error && <p>{error}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}
export default FakeKYC;