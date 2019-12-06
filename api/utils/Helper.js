import bcrypt from 'bcrypt';

const Helper = {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    hashPassword(password) {
        if (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        }
        return password;
    },
};

export default Helper;