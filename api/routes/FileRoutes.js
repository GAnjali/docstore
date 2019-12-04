import {Router} from 'express';
import FileController from "../controllers/FileController";

const fileRouter = Router();

fileRouter.get('/', FileController.getAllFiles);

export default fileRouter;