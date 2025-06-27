import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

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

const getCurrentController = (req, res) => {
  const { username, email } = req.user;

  res.json({
    username,
    email,
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
};
