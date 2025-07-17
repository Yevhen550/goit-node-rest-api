import express from "express";

import validateBody from "../helpers/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
  authVerifySchema,
} from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewars/authenticate.js";
import upload from "../middlewars/upload.js";
import contactsControllers from "../controllers/contactsControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  authControllers.loginController
);

authRouter.post("/verify", validateBody(authVerifySchema), authControllers.resendVerifyEmailController);

authRouter.get("/current", authenticate, authControllers.getCurrentController);

authRouter.post("/logout", authenticate, authControllers.logoutController);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  contactsControllers.updateAvatarController
);

export default authRouter;
