import * as controller from "../controllers/auth.controllers";
import { authenticateToken } from "../middlewares/auth.middlewares";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", controller.register);

export { authRouter };
