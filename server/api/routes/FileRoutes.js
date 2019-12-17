import {Router} from 'express';
import FileController from "../controllers/FileController";
import AuthUtil from "../utils/AuthUtil";

const fileRouter = Router();

fileRouter.get('/', AuthUtil.verifyToken, FileController.getAll);
fileRouter.get('/parentfolder=:parentfolderid', AuthUtil.verifyToken, FileController.getAllByParent);
fileRouter.post('/', AuthUtil.verifyToken, FileController.add);
fileRouter.get('/:id', AuthUtil.verifyToken, FileController.getOne);
fileRouter.put('/:id', AuthUtil.verifyToken, FileController.update);
fileRouter.delete('/:id', AuthUtil.verifyToken, FileController.delete);

export default fileRouter;