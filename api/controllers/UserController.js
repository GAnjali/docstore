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

    static async login(req, res) {
        if (!req.body.email || !req.body.password) {
            util.setError(400, 'Some values are missing');
            return util.send(res);
        }
        if (!Helper.isValidEmail(req.body.email)) {
            util.setError(400, 'Please enter a valid email address');
            return util.send(res);
        }
        try {
            const user = await UserService.getAUser(req.body.email);
            if(user && !Helper.comparePassword(user.password, req.body.password)) {
                util.setError(400, 'The credentials you provided is incorrect');
                return util.send(res);
            }
            const token = Helper.generateToken(user.id);
            util.setSuccess(200, "Token generated", token);
            return util.send(res);
        } catch(error) {
            util.setError(400, error);
            return util.send(res);
        }
    };

    static async update(req, res){
        req.body.password = Helper.hashPassword(req.body.password);
        const updateUser = req.body;
        if (!Helper.isValidEmail(req.body.email)) {
            util.setError(400, 'Please enter a valid email address');
            return util.send(res);
        }
        try{
            const updatedUser = await UserService.update(updateUser);
            if (!updatedUser) {
                util.setError(404, `Cannot find user with the email: ${req.body.email}`);
            } else {
                util.setSuccess(200, 'User updated', updateUser);
            }
            return util.send(res);
        }catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }
}

export default UserController;