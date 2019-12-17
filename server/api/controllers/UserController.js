import UserService from "../services/UserService";
import ResponseUtil from "../utils/ResponseUtil";
import AuthUtil from "../utils/AuthUtil";
import FileService from "../services/FileService";

const util = new ResponseUtil();

class UserController {

    static async create(req, res) {
        req.body.password = AuthUtil.hashPassword(req.body.password);
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
        if (!AuthUtil.isValidEmail(req.body.email)) {
            util.setError(400, 'Please enter a valid email address');
            return util.send(res);
        }
        try {
            const user = await UserService.getOneByEmail(req.body.email);
            if (!user) {
                util.setError(400, "User not registered, please sign up your account");
                return util.send(res);
            }
            if (user && !AuthUtil.comparePassword(user.password, req.body.password)) {
                util.setError(400, 'The credentials you provided is incorrect');
                return util.send(res);
            }
            const token = AuthUtil.generateToken(user.id);
            util.setSuccess(200, "Token generated", token);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    };

    static async update(req, res) {
        req.body.password = AuthUtil.hashPassword(req.body.password);
        const updateUser = req.body;
        if (!AuthUtil.isValidEmail(req.body.email)) {
            util.setError(400, 'Please enter a valid email address');
            return util.send(res);
        }
        try {
            const updatedUser = await UserService.update(updateUser);
            if (!updatedUser) {
                util.setError(404, `Cannot find user with the email: ${req.body.email}`);
            } else {
                util.setSuccess(200, 'User updated', updateUser);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async get(req, res) {
        const {email} = req.params;
        if (!AuthUtil.isValidEmail(email)) {
            util.setError(400, 'Please enter a valid email address');
            return util.send(res);
        }
        try {
            const user = await UserService.getOneByEmail(email);

            if (!user) {
                util.setError(404, `Cannot find user with the email ${email}`);
            } else {
                util.setSuccess(200, 'Found User!', user);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }
}

export default UserController;