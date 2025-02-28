import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CONFIG from "../config";
import "../styles/global.css";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${CONFIG.API_URL}/profile`);
            setProfile(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching profile data. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <Sidebar />
            <div className="main-content">
                <TopBar />
                <div className="profile-page">
                    <h2>User Profile</h2>
                    {error && <p className="error-message">{error}</p>}
                    {loading ? <p>Loading profile...</p> : (
                        profile ? (
                            <div className="profile-details">
                                <p><strong>Name:</strong> {profile.name}</p>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Role:</strong> {profile.role}</p>
                            </div>
                        ) : <p>No profile data found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;