const axios = require('axios');

export const login = async (email, password) => {
    try {
        const callStatus = await axios.post(`http://localhost:3000/users/login`, {
            email,
            password,
        });
        return callStatus;
    } catch (error) {
        return error;
    }
};