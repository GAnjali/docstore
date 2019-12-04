import {Router} from 'express';
import FileController from "../controllers/FileController";

const fileRouter = Router();

fileRouter.get('/', FileController.getAllFiles);
fileRouter.post('/', FileController.addFile);
fileRouter.get('/:id', FileController.getAFile);
fileRouter.put('/:id', FileController.updateFile);
fileRouter.delete('/:id', FileController.deleteFile);

export default fileRouter;