import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import { emailRegexp } from "../constants/auth.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: emailRegexp,
    },
    unique: {
      args: true,
      msg: "Email in use",
    },
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
});

// User.sync({ alter: true });

export default User;
