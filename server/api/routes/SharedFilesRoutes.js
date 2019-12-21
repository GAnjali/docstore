import {Router} from 'express';
import SharedFilesController from "../controllers/SharedFilesController";
import AuthUtil from "../utils/AuthUtil";

const sharedFilesRoutes = Router();

sharedFilesRoutes.get('/userid=:userid', AuthUtil.verifyToken, SharedFilesController.getSharedFiles);

export default sharedFilesRoutes;