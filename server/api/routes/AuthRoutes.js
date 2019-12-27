import { Router } from "express";
import AuthController from "../controllers/AuthController";

const authRoutes = Router();

authRoutes.post("/", AuthController.login);

export default authRoutes;
