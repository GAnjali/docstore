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