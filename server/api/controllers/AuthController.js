import AuthUtil from "../utils/AuthUtil";
import UserService from "../services/UserService";
import ResponseUtil from "../utils/ResponseUtil";

const responseUtil = new ResponseUtil();
class AuthController {
  static async login(req, res) {
    if (!req.body.email || !req.body.password) {
      responseUtil.setError(400, "Some values are missing");
      return responseUtil.send(res);
    }
    if (!AuthUtil.isValidEmail(req.body.email)) {
      responseUtil.setError(400, "Please enter a valid email address");
      return responseUtil.send(res);
    }
    try {
      const user = await UserService.getOneByEmail(req.body.email);
      if (!user) {
        responseUtil.setError(
          400,
          "User not registered, please sign up your account"
        );
        return responseUtil.send(res);
      }
      if (user && !AuthUtil.comparePassword(user.password, req.body.password)) {
        responseUtil.setError(400, "The credentials you provided is incorrect");
        return responseUtil.send(res);
      }
      const token = AuthUtil.generateToken(user.id);
      responseUtil.setSuccess(200, "Token generated", token);
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }
}

export default AuthController;