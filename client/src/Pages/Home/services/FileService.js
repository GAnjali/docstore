const axios = require('axios');

const config = {
    headers: {
        "x-access-token": localStorage.getItem("token")
    }
};

export const getFiles = async (parentfolderid) => {
    try {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/files/parentfolder=' + parentfolderid, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const getSharedFiles = async (userId) => {
    try {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/sharedfiles/userid=' + userId, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const getFileByid = async (id) => {
    try {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/files/' + id, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const updateFile = async (file) => {
    try {
        const response = await axios.put(process.env.REACT_APP_SERVER_URL + '/files/' + file.id, file, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const deleteFile = async (id) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_SERVER_URL + '/files/' + id, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const addFile = async (file) => {
    try {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/files/', file, config);
        return response;
    } catch (e) {
        return e;
    }
};