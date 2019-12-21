import {FOLDERS_BY_ID_API_ENDPOINT, GET_FILES_API_ENDPOINT} from "../../../AppConstants";

const axios = require('axios');

const config = {
    headers: {
        "x-access-token": localStorage.getItem("token")
    }
};

export const getFolders = async (parentfolderid) => {
    try {
        let response;
        response = await axios.get(process.env.REACT_APP_SERVER_URL + GET_FILES_API_ENDPOINT + parentfolderid, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const addFolder = async (folder) => {
    try {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + FOLDERS_BY_ID_API_ENDPOINT, folder, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const deleteFolder = async (id) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_SERVER_URL + FOLDERS_BY_ID_API_ENDPOINT + id, config);
        return response;
    } catch (e) {
        return e;
    }
};