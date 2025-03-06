const CONFIG = {
  // ✅ Frontend URL
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://ng-fin-manager-frontend.vercel.app",

  // ✅ Backend API URL
  API_URL: process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com",

  // ✅ Authentication Endpoints
  AUTH: {
    LOGIN: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/login`,
    REGISTER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/register`,
    LOGOUT: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/logout`,
    SESSION: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/session`
  },

  // ✅ Axios Config
  AXIOS_CONFIG: {
    withCredentials: true, // Ensure cookies are sent with requests
    headers: {
      "Content-Type": "application/json",
      "Origin": process.env.REACT_APP_FRONTEND_URL || "https://ng-fin-manager-frontend.vercel.app", // Explicitly set origin
    },
  },

  // ✅ Session Config
  SESSION: {
    COOKIE_NAME: "connect.sid", // Name of the session cookie
    MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
  },
};

export default CONFIG;