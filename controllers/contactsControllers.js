import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContactsController = async (req, res) => {
  const { id } = req.user;

  const result = await contactsService.listContacts({ owner: id });
  res.json(result);
};

const getOneContactController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.getContact({ id, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const createContactController = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner: id });

  res.status(201).json(result);
};

const updateContactController = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.updateContact({ id, owner }, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.removeContact({ id, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateStatusContactController = async (req, res) => {
  const { id } = req.params;

  if (!("favorite" in req.body)) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await contactsService.updateStatusContact(id, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getOneContactController: ctrlWrapper(getOneContactController),
  deleteContactController: ctrlWrapper(deleteContactController),
  createContactController: ctrlWrapper(createContactController),
  updateContactController: ctrlWrapper(updateContactController),
  updateStatusContactController: ctrlWrapper(updateStatusContactController),
};
