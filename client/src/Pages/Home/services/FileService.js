import {
  FILE_BY_ID_API_ENDPOINT,
  GET_FILES_API_ENDPOINT,
  GET_SHARED_FILES_API_ENDPOINT
} from "../../../AppConstants";

const axios = require("axios");

const config = {
  headers: {
    "x-access-token": localStorage.getItem("token")
  }
};

export const getFiles = async parentfolderid => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        GET_FILES_API_ENDPOINT +
        parentfolderid,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const getSharedFiles = async userId => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + GET_SHARED_FILES_API_ENDPOINT + userId,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const getFileByid = async id => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_SERVER_URL + FILE_BY_ID_API_ENDPOINT + id,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const updateFile = async file => {
  try {
    const response = await axios.put(
      process.env.REACT_APP_SERVER_URL + FILE_BY_ID_API_ENDPOINT + file.id,
      file,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const deleteFile = async id => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_SERVER_URL + FILE_BY_ID_API_ENDPOINT + id,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const addFile = async file => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_SERVER_URL + FILE_BY_ID_API_ENDPOINT,
      file,
      config
    );
    return response;
  } catch (e) {
    return e;
  }
};