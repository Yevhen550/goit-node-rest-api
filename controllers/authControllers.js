import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { listContacts } from "../services/contactsServices.js";

const registerController = async (req, res) => {
  const { email, subscription } = await authServices.registerUser(req.body);

  res.status(201).json({
    email,
    subscription,
  });
};

const loginController = async (req, res) => {
  const { token, user, contacts } = await authServices.loginUser(req.body);

  res.json({
    token,
    user,
    contacts,
  });
};

const getCurrentController = async (req, res) => {
  const { email, subscription, id } = req.user;
  const contacts = await listContacts({ owner: id });

  res.json({
    email,
    subscription,
    contacts,
  });
};

const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);

  res.status(204).end();
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
};
