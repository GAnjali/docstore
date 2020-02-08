import { SHARES_API_ENDPOINT, USERS_API_ENDPOINT } from "../../../AppConstants";

const axios = require("axios");

const config = {
  headers: {
    "x-access-token": localStorage.getItem("token")
  }
};

export const getUserByEmail = async email => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + USERS_API_ENDPOINT + email,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const addShare = async (fileid, sharetype, userid) => {
  const input = {
    fileid: fileid,
    userid: userid,
    sharetype: sharetype
  };
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + SHARES_API_ENDPOINT,
      input,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const getShare = async (userId, fileId) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        SHARES_API_ENDPOINT +
        userId +
        "/fileid=" +
        fileId,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};