import express from "express";

import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema } from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.registerController
);

export default authRouter;
