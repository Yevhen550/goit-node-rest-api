import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContactsController);

contactsRouter.get("/:id", contactsControllers.getOneContactController);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContactController
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsControllers.updateContactController
);

contactsRouter.delete("/:id", contactsControllers.deleteContactController);

export default contactsRouter;
