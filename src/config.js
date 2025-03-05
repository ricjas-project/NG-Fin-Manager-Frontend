const CONFIG = {
  // ✅ Frontend URL
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://ng-fin-manager-frontend.vercel.app",

  // ✅ Backend API URL (Corrected to Render)
  API_URL: process.env.REACT_APP_API_URL || "https://ng-fin-manager.onrender.com",

  // ✅ Authentication Endpoints (Fixed URLs)
  AUTH: {
    LOGIN: "https://ng-fin-manager.onrender.com/auth/login",
    REGISTER: "https://ng-fin-manager.onrender.com/auth/register",
    LOGOUT: "https://ng-fin-manager.onrender.com/auth/logout",
    SESSION: "https://ng-fin-manager.onrender.com/auth/session" // ✅ Removed extra comma
  },

  // ✅ User Management Endpoints
  USERS: {
    GET_ALL: "https://ng-fin-manager.onrender.com/users/list",
    ADD_USER: "https://ng-fin-manager.onrender.com/users/add",
    DELETE_USER: "https://ng-fin-manager.onrender.com/users/delete",
    UPDATE_USER: "https://ng-fin-manager.onrender.com/users/update",
    ME: "https://ng-fin-manager.onrender.com/users/me" // ✅ Fixed syntax error
  },

  // ✅ Transactions API
  TRANSACTIONS: {
    GET_ALL: "https://ng-fin-manager.onrender.com/transactions",
    INITIATE: "https://ng-fin-manager.onrender.com/transactions/initiate",
    STATUS: "https://ng-fin-manager.onrender.com/transactions/status"
  },

  // ✅ Third-Party API Integrations
  API_SERVICES: {
    FAKE_KYC: "https://ng-fin-manager.onrender.com/fake-kyc",
    IBAN_VALIDATION: "https://ng-fin-manager.onrender.com/iban/validate",
    SEND_SMS: "https://ng-fin-manager.onrender.com/sms/send",
    EXCHANGE_RATE: "https://ng-fin-manager.onrender.com/exchangeRate",
    GEO_LOCATION: "https://ng-fin-manager.onrender.com/ip-Geolocation"
  },

  // ✅ Other Configurations
  SETTINGS: {
    DEFAULT_THEME: "light",
    ENABLE_NOTIFICATIONS: true,
    LOGOUT_REDIRECT: "/"
  },

  // ✅ Axios Config for Requests
  AXIOS_CONFIG: {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true, // ✅ Ensures cookies are included in API calls
  }
};

export default CONFIG;