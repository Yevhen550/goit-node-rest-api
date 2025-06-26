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
      msg: "This email already exist",
    },
  },
  // subscription: {
  //   type: DataTypes.ENUM,
  //   values: ["starter", "pro", "business"],
  //   defaultValue: "starter",
  // },
  // token: {
  //   type: DataTypes.STRING,
  //   defaultValue: null,
  // },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.sync();

export default User;
