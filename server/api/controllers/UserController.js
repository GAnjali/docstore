import UserService from "../services/UserService";
import ResponseUtil from "../utils/ResponseUtil";
import AuthUtil from "../utils/AuthUtil";

const responseUtil = new ResponseUtil();

class UserController {
  static async create(req, res) {
    req.body.password = AuthUtil.hashPassword(req.body.password);
    const newUser = req.body;
    try {
      const createdUser = await UserService.add(newUser);
      responseUtil.setSuccess(201, "User Added!", createdUser);
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error.message);
      return responseUtil.send(res);
    }
  }

  static async update(req, res) {
    req.body.password = AuthUtil.hashPassword(req.body.password);
    const updateUser = req.body;
    if (!AuthUtil.isValidEmail(req.body.email)) {
      responseUtil.setError(400, "Please enter a valid email address");
      return responseUtil.send(res);
    }
    try {
      const updatedUser = await UserService.update(updateUser);
      if (!updatedUser) {
        responseUtil.setError(
          404,
          `Cannot find user with the email: ${req.body.email}`
        );
      } else {
        responseUtil.setSuccess(200, "User updated", updateUser);
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }

  static async get(req, res) {
    const { email } = req.params;
    if (!AuthUtil.isValidEmail(email)) {
      responseUtil.setError(400, "Please enter a valid email address");
      return responseUtil.send(res);
    }
    try {
      const user = await UserService.getOneByEmail(email);

      if (!user) {
        responseUtil.setError(404, `Cannot find user with the email ${email}`);
      } else {
        responseUtil.setSuccess(200, "Found User!", user);
      }
      return responseUtil.send(res);
    } catch (error) {
      responseUtil.setError(400, error);
      return responseUtil.send(res);
    }
  }
}

export default UserController;