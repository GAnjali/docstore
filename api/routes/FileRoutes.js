import {Router} from 'express';
import FileController from "../controllers/FileController";

const fileRouter = Router();

fileRouter.get('/', FileController.getAllFiles);
fileRouter.post('/', FileController.addFile);

export default fileRouter;