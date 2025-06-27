import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { listContacts } from "../services/contactsServices.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    email: newUser.email,
    username: newUser.username,
  });
};

const loginController = async (req, res) => {
  const token = await authServices.loginUser(req.body);

  res.json({ token });
};

const getCurrentController = async (req, res) => {
  const { username, email, id } = req.user;
  const contacts = await listContacts({ owner: id });

  res.json({
    username,
    email,
    contacts,
  });
};

const logoutController = async (req, res) => {
  await authServices.logoutUser(req.user);

  res.json({
    message: "Logout successfully",
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
};
