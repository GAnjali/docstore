const axios = require('axios');

const register = async (email, password) => {
    try {
        const callStatus = await axios.post(`http://localhost:3000/users`, {
            email,
            password,
        });
        return callStatus;
    } catch (error) {
        return error;
    }
};

export default register;