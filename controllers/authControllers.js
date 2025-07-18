import * as authServices from "../services/authServices.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import User from "../db/User.js";
import { sendVerificationEmail } from "../helpers/sendEmail.js";


const registerController = async (req, res) => {
  const { email, subscription } = await authServices.registerUser(req.body);

  res.status(201).json({
    user: { email, subscription },
  });
};

const loginController = async (req, res) => {
  const { token, user } = await authServices.loginUser(req.body);

  if (!user.verify) {
    return res.status(401).json({ message: "Email is not verified" });
  }

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

const verifyEmailController = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ where: { verificationToken } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmailController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  await sendVerificationEmail(user.email, user.verificationToken);

  res.status(200).json({ message: "Verification email sent" });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
  resendVerifyEmailController: ctrlWrapper(resendVerifyEmailController),
  verifyEmailController: ctrlWrapper(verifyEmailController),
};
