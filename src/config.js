const CONFIG = {
  // ✅ Frontend URL
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://ng-fin-manager-frontend.vercel.app",

  // ✅ Backend API URL (Corrected to Render)
  API_URL: process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com",

  // ✅ Authentication Endpoints (Fixed URLs)
  AUTH: {
    LOGIN: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/login`,
    REGISTER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/register`,
    LOGOUT: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/logout`,
    SESSION: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/auth/session`, // ✅ Added session check
  },

  // ✅ User Management Endpoints
  USERS: {
    GET_ALL: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/users/list`,
    ADD_USER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/users/add`,
    DELETE_USER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/users/delete`,
    UPDATE_USER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/users/update`,
    ME: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/users/me, // ✅ Ensure `me` endpoint works
  },

  // ✅ Transactions API
  TRANSACTIONS: {
    GET_ALL: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/transactions`,
    INITIATE: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/transactions/initiate`,
    STATUS: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/transactions/status`,
  },

  // ✅ Third-Party API Integrations
  API_SERVICES: {
    FAKE_KYC: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/fake-kyc`,
    IBAN_VALIDATION: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/iban/validate`,
    SEND_SMS: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/sms/send`,
    EXCHANGE_RATE: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/exchangeRate`,
    GEO_LOCATION: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com"}/ip-Geolocation`,
  },

  // ✅ Other Configurations
  SETTINGS: {
    DEFAULT_THEME: "light",
    ENABLE_NOTIFICATIONS: true,
    LOGOUT_REDIRECT: "/",
  },

  // ✅ Axios Config for Requests
  AXIOS_CONFIG: {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ Ensures cookies are included in API calls
  },
};

export default CONFIG;