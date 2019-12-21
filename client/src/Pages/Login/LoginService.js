const axios = require("axios");

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users/login",
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