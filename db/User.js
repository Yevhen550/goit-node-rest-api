import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";
import { emailRegexp } from "../constants/auth.js";

const User = sequelize.define("user", {
  username: {
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
      msg: "This email already exist",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.sync();

export default User;
