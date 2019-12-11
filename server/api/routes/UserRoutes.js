import {Router} from 'express';
import UserController from "../controllers/UserController";

const userRoutes = Router();

userRoutes.post('/', UserController.create);
userRoutes.post('/login', UserController.login);
userRoutes.put('/update', UserController.update);

export default userRoutes;