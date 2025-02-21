import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const navigate = useNavigate();

  // Open User Menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close User Menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear stored user session
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#2c3e50" }}>
      <Toolbar>
        {/* Branding */}
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          NG-FIN-MANAGER 2
        </Typography>

        {/* Notifications Icon */}
        <IconButton color="inherit">
          <Badge badgeContent={notifications} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Profile Menu */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar sx={{ bgcolor: "white", color: "black" }}>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>

        {/* Dropdown Menu for Profile & Logout */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;