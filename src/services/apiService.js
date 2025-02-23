import axios from "axios";
import CONFIG from "../config"; // ✅ Import Config File

const apiService = {
  // ✅ Get Fake KYC Data
  async getFakeKYC() {
    try {
      const response = await axios.get(CONFIG.API_SERVICES.FAKE_KYC);
      return response.data;
    } catch (error) {
      console.error("Error fetching Fake KYC:", error);
      throw error;
    }
  },

  // ✅ Validate IBAN
  async validateIBAN(iban) {
    try {
      const response = await axios.get(`${CONFIG.API_SERVICES.IBAN_VALIDATION}/${iban}`);
      return response.data;
    } catch (error) {
      console.error("Error validating IBAN:", error);
      throw error;
    }
  },

  // ✅ Send SMS
  async sendSMS(number, message) {
    try {
      const response = await axios.post(CONFIG.API_SERVICES.SEND_SMS, {
        phone: number,
        message: message,
        key: CONFIG.API_KEYS.TEXTBELT,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
    }
  },

  // ✅ Get Exchange Rate
  async getExchangeRate(currency) {
    try {
      const response = await axios.get(`${CONFIG.API_SERVICES.EXCHANGE_RATE}/${currency}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Exchange Rate:", error);
      throw error;
    }
  },

  // ✅ Get User Location
  async getUserLocation(ip) {
    try {
      const response = await axios.get(`${CONFIG.API_SERVICES.GEO_LOCATION}/${ip}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching User Location:", error);
      throw error;
    }
  },
};

export default apiService;