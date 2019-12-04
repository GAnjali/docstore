import {Router} from 'express';
import FileController from "../controllers/FileController";

const fileRouter = Router();

fileRouter.get('/', FileController.getAllFiles);
fileRouter.post('/', FileController.addFile);
fileRouter.get('/:id', FileController.getAFile);

export default fileRouter;