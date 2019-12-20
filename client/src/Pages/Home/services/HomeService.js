const axios = require('axios');

const config = {
    headers: {
        "x-access-token": localStorage.getItem("token")
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