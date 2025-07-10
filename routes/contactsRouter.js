import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../middlewars/authenticate.js";
import upload from "../middlewars/upload.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContactsController);

contactsRouter.get("/:id", contactsControllers.getOneContactController);

contactsRouter.post(
  "/",  
  upload.single("avatar"),
  validateBody(createContactSchema),
  contactsControllers.createContactController
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsControllers.updateContactController
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  contactsControllers.updateStatusContactController
);

contactsRouter.delete("/:id", contactsControllers.deleteContactController);

export default contactsRouter;
