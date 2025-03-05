const CONFIG = {
  // ✅ Frontend URL
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://ng-fin-manager-frontend.vercel.app",

  // ✅ Backend API URL
  API_URL: process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com",

  // ✅ Authentication Endpoints (Fixed URLs)
  AUTH: {
    LOGIN: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/login`,
    REGISTER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/register`,
    LOGOUT: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/logout`,
    SESSION: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/session`
  },

  // ✅ Axios Config
  AXIOS_CONFIG: {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ Must be included for session cookies
  }
};

export default CONFIG;