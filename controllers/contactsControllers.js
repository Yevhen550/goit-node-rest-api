import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContactsController = async (req, res) => {
  const result = await contactsService.getAllContacts();
  res.json(result);
};

const getOneContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getOneContact(id);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const createContactController = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  const result = await contactsService.createContact(req.body);

  res.status(201).json(result);
};

const updateContactController = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.deleteContact(id);

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
};
