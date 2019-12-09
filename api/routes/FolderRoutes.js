import {Router} from 'express';
import FolderController from "../controllers/FolderController";
import Auth from "../utils/Auth";

const folderRoutes = Router();

folderRoutes.post('/', Auth.verifyToken, FolderController.create);
folderRoutes.get('/', Auth.verifyToken, FolderController.getAll);
folderRoutes.delete('/:id', Auth.verifyToken, FolderController.delete);

export default folderRoutes;