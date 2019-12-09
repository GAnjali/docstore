import {Router} from 'express';
import FileController from "../controllers/FileController";
import Auth from "../utils/Auth";

const fileRouter = Router();

fileRouter.get('/', Auth.verifyToken, FileController.getAllFiles);
fileRouter.post('/', Auth.verifyToken, FileController.addFile);
fileRouter.get('/:id', Auth.verifyToken, FileController.getAFile);
fileRouter.put('/:id', Auth.verifyToken, FileController.updateFile);
fileRouter.delete('/:id', Auth.verifyToken, FileController.deleteFile);

export default fileRouter;