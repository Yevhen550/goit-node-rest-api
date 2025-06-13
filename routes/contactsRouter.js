import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContactsController);

contactsRouter.get("/:id", contactsControllers.getOneContactController);

contactsRouter.delete("/:id", contactsControllers.deleteContactController);

contactsRouter.post("/", contactsControllers.createContactController);

contactsRouter.put("/:id", contactsControllers.updateContactController);

export default contactsRouter;
