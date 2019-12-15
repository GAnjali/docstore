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
        let response;
        response = await axios.get(process.env.REACT_APP_SERVER_URL + '/files/parentfolder=' + parentfolderid, config);
        return response;
    } catch (e) {
        return e;
    }
};