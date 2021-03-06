import { Router } from "express";
import UserController from "../controllers/UserController";

const userRoutes = Router();

userRoutes.post("/", UserController.create);
userRoutes.put("/update", UserController.update);
userRoutes.get("/:email", UserController.get);

export default userRoutes;