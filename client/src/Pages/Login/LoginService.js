import { LOGIN_API_ENDPOINT } from "../../AppConstants";

const axios = require("axios");

export const login = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_API_ENDPOINT, {
      email,
      password
    });
    return response;
  } catch (error) {
    return error;
  }
};