const axios = require("axios");

const register = async (email, password) => {
  try {
    const callStatus = await axios.post(process.env.REACT_APP_SERVER_URL+"/users", {
      email,
      password
    });
    return callStatus;
  } catch (error) {
    return error;
  }
};

export default register;
