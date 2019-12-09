import {Router} from 'express';
import ShareController from "../controllers/ShareController";

const shareRoutes = Router();

shareRoutes.post('/', ShareController.addShare);
shareRoutes.get('/:id', ShareController.getAllSharings);

export default shareRoutes;