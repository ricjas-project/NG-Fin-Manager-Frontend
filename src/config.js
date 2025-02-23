const CONFIG = {
  // ✅ Frontend URL
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "https://ng-fin-manager-frontend.vercel.app",

  // ✅ Backend API URL (Corrected to Render)
  API_URL: process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com",

  // ✅ Authentication Endpoints (Fixed URLs)
  AUTH: {
    LOGIN: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/auth/login`,
    REGISTER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/auth/register`,
    USERS: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/users`,
  },

  // ✅ User Management Endpoints (Fixed URLs)
  USERS: {
    GET_ALL: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/users/list`,
    ADD_USER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/users/add`,
    DELETE_USER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/users/delete`,
    UPDATE_USER: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/users/update`,
  },

  // ✅ Transactions API (Fixed URLs)
  TRANSACTIONS: {
    GET_ALL: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/transactions`,
    INITIATE: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/transactions/initiate`,
    STATUS: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/transactions/status`,
  },

  // ✅ Third-Party API Integrations (Fixed URLs)
  API_SERVICES: {
    FAKE_KYC: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/api/fake-kyc`,
    IBAN_VALIDATION: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/api/validate-iban`,
    SEND_SMS: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/api/send-sms`,
    EXCHANGE_RATE: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/api/exchange-rate`,
    GEO_LOCATION: `${process.env.REACT_APP_API_URL || "https://ng-fin-manager-backend.onrender.com"}/api/user-location`,
  },

  // ✅ Other Configurations
  SETTINGS: {
    DEFAULT_THEME: "light", // Options: 'light' or 'dark'
    ENABLE_NOTIFICATIONS: true,
    LOGOUT_REDIRECT: "/",
  },
};

export default CONFIG;