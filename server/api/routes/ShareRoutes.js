import {Router} from 'express';
import ShareController from "../controllers/ShareController";
import AuthUtil from "../utils/AuthUtil";

const shareRoutes = Router();

shareRoutes.post('/', AuthUtil.verifyToken, ShareController.addShare);
shareRoutes.get('/:id', AuthUtil.verifyToken, ShareController.getAllSharings);

export default shareRoutes;