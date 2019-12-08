import jwt from 'jsonwebtoken';
import database from '../../db/models/index';
import Util from "./Util";

const util = new Util();
const Auth = {
    /**
     * Verify Token
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object|void} response object
     */
    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            util.setError(400, 'Token is not provided');
            return util.send(res);
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            const loggedInUser = await database.user.findOne({
                where: {id: decoded.userId}
            });
            if (!loggedInUser) {
                util.setError(400, 'The token you provided is invalid');
                return util.send(res);
            }
            req.user = {id: decoded.userId};
            next();
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
};

export default Auth;
