const axios = require("axios");
require("dotenv").config();

const apiService = {
  async getFakeKYC() {
    const response = await axios.get(process.env.FAKEID_API);
    return response.data;
  },

  async validateIBAN(iban) {
    const response = await axios.get(`${process.env.IBAN_API}/${iban}`);
    return response.data;
  },

  async sendSMS(number, message) {
    const response = await axios.post("https://textbelt.com/text", {
      phone: number,
      message: message,
      key: process.env.TEXTBELT_API_KEY,
    });
    return response.data;
  },

  async getExchangeRate(currency) {
    const response = await axios.get(`${process.env.EXCHANGE_RATE_API}/${currency}`);
    return response.data;
  },

  async getUserLocation(ip) {
    const response = await axios.get(`${process.env.IPINFO_API}/${ip}`);
    return response.data;
  },
};

module.exports = apiService;