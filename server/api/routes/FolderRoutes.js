import {Router} from 'express';
import FolderController from "../controllers/FolderController";
import AuthUtil from "../utils/AuthUtil";

const folderRoutes = Router();

folderRoutes.post('/', AuthUtil.verifyToken, FolderController.create);
folderRoutes.get('/', AuthUtil.verifyToken, FolderController.getAll);
folderRoutes.get('/parentfolder=:parentfolderid', AuthUtil.verifyToken, FolderController.getAllByParent);
folderRoutes.delete('/:id', AuthUtil.verifyToken, FolderController.delete);

export default folderRoutes;