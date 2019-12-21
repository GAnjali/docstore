import { SIGNUP_API_ENDPOINT } from "../../AppConstants";

const axios = require("axios");

const register = async (email, password) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + SIGNUP_API_ENDPOINT,
      {
        email,
        password
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export default register;