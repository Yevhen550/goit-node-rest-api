import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { listContacts } from "../services/contactsServices.js";

const registerController = async (req, res) => {
  const { email, subscription } = await authServices.registerUser(req.body);

  res.status(201).json({
    user: { email, subscription },
  });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);

  res.json({
    token,
    user,
  });
};

const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);

  res.status(204).end();
};

const resendVerifyEmailController = async (req, res) => {
  const { email } = req.body;
  await authServices.resendVerifyEmail(email);

  res.json({
    message: "Verify email resend",
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
  resendVerifyEmailController: ctrlWrapper(resendVerifyEmailController),
};
