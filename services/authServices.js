import bcrypt from "bcrypt";

import User from "../db/User.js";

export const registerUser = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  return User.create({ ...payload, password: hashPassword });
};
