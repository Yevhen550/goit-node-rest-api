import HttpError from "../helpers/HttpError.js";

import { UniqueConstraintError, ValidationError } from "sequelize";

const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        error.status = 409;
        // throw HttpError(409, "This user is already in base");
      } else if (error instanceof ValidationError) {
        error.status = 400;
        // throw HttpError(400);
      }
      next(error);
    }
  };
  return func;
};

export default ctrlWrapper;
