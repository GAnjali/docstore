import { Router } from "express";
import ShareController from "../controllers/ShareController";
import AuthUtil from "../utils/AuthUtil";

const shareRoutes = Router();

shareRoutes.post("/", AuthUtil.verifyToken, ShareController.add);
shareRoutes.get("/:userid", AuthUtil.verifyToken, ShareController.getAllByUser);
shareRoutes.get(
  "/:userid/fileid=:fileid",
  AuthUtil.verifyToken,
  ShareController.getAllByFileUser
);

export default shareRoutes;
