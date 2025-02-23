import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CONFIG from "../config";
import axios from "axios";
import "../styles/global.css";

function Settings() {
    const [theme, setTheme] = useState("light");
    const [notifications, setNotifications] = useState(true);
    const [error, setError] = useState("");

    // ✅ Fetch current settings from backend
    useEffect(() => {
        axios.get(`${CONFIG.API_URL}/settings`)
            .then((res) => {
                setTheme(res.data.theme || "light");
                setNotifications(res.data.notifications || false);
            })
            .catch(() => setError("Error loading settings."));
    }, []);

    // ✅ Save settings to backend
    const handleSave = () => {
        axios.post(`${CONFIG.API_URL}/settings/update`, { theme, notifications })
            .then(() => alert("Settings updated successfully!"))
            .catch(() => setError("Error saving settings."));
    };

    return (
        <div className="settings-container">
            <Sidebar />
            <div className="main-content">
                <TopBar />
                <div className="settings-panel">
                    <h2>Settings</h2>

                    {/* ✅ Show error message if any */}
                    {error && <p className="error-message">{error}</p>}

                    <label>Theme:</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>

                    <label>
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                        />
                        Enable Notifications
                    </label>

                    <button onClick={handleSave}>Save Settings</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;