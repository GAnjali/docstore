import {Router} from 'express';
import FileController from "../controllers/FileController";
import AuthUtil from "../utils/AuthUtil";

const fileRouter = Router();

fileRouter.get('/', AuthUtil.verifyToken, FileController.getAllFiles);
fileRouter.post('/', AuthUtil.verifyToken, FileController.addFile);
fileRouter.get('/:id', AuthUtil.verifyToken, FileController.getAFile);
fileRouter.put('/:id', AuthUtil.verifyToken, FileController.updateFile);
fileRouter.delete('/:id', AuthUtil.verifyToken, FileController.deleteFile);

export default fileRouter;