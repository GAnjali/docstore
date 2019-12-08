import {Router} from 'express';
import FolderController from "../controllers/FolderController";
import Auth from "../utils/Auth";

const folderRoutes = Router();

folderRoutes.post('/', Auth.verifyToken, FolderController.create);

export default folderRoutes;