const axios = require('axios');

const config = {
    headers: {
        "x-access-token": localStorage.getItem("token")
    }
};

export const getFolders = async (parentfolderid) => {
    try {
        let response;
        response = await axios.get(process.env.REACT_APP_SERVER_URL + '/folders/parentfolder=' + parentfolderid, config);
        return response;
    } catch (e) {
        return e;
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

export const getUserByEmail = async (email) => {
    try {
        console.log(email);
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/users/' + email, config);
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
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/shares/', input, config);
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

export const addFolder = async (folder) => {
    try {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/folders/', folder, config);
        return response;
    } catch (e) {
        return e;
    }
};

export const deleteFolder = async (id) => {
    try {
        const response = await axios.delete(process.env.REACT_APP_SERVER_URL + '/folders/' + id, config);
        return response;
    } catch (e) {
        return e;
    }
};