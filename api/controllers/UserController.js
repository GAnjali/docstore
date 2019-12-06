import UserService from "../services/UserService";
import Util from "../utils/Util";
import Helper from "../utils/Helper";

const util = new Util();

class UserController {

    static async create(req, res) {
        req.body.password = Helper.hashPassword(req.body.password);
        const newUser = req.body;
        try {
            const createdUser = await UserService.add(newUser);
            util.setSuccess(201, 'User Added!', createdUser);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}

export default UserController;