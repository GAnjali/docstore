import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import database from "../../db/models";
import ResponseUtil from "./ResponseUtil";

const AuthUtil = {
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
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
      {
        userId: id
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );
    return token;
  },
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const util = new ResponseUtil();
    const token = req.headers["x-access-token"];
    if (!token) {
      util.setError(400, "Token is not provided");
      return util.send(res);
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const loggedInUser = await database.user.findOne({
        where: { id: decoded.userId }
      });
      if (!loggedInUser) {
        util.setError(400, "The token you provided is invalid");
        return util.send(res);
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
};

export default AuthUtil;