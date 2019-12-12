const axios = require('axios');

const login = async (email, password) => {
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


export default login;