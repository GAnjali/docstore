const axios = require("axios");

const register = async (email, password) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users",
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
