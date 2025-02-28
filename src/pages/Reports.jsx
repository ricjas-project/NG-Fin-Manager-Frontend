import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CONFIG from "../config";
import "../styles/global.css";

function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get(`${CONFIG.API_URL}/reports`);
            setReports(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching reports. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="reports-container">
            <Sidebar />
            <div className="main-content">
                <TopBar />
                <div className="reports-page">
                    <h2>Reports</h2>
                    {error && <p className="error-message">{error}</p>}
                    {loading ? <p>Loading reports...</p> : (
                        reports.length > 0 ? (
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Report Name</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((report) => (
                                        <tr key={report._id}>
                                            <td>{report.name}</td>
                                            <td>{new Date(report.date).toLocaleString()}</td>
                                            <td>{report.type}</td>
                                            <td><button onClick={() => window.open(report.link, "_blank")}>View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : <p>No reports found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Reports;