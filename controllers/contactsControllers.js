import { unlink } from "node:fs/promises";
import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { findUser } from "../services/authServices.js";
import cloudinary from "../helpers/cloudinary.js";

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
  let avatarURL = null;

  if (req.file) {
    const { url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      use_filename: true,
    });
    avatarURL = url;
    await unlink(req.file.path);
  }

  const { id } = req.user;
  const result = await contactsService.addContact({
    ...req.body,
    avatarURL,
    owner: id,
  });

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

const updateAvatarController = async (req, res) => {
  const { id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }

  const { path: tempPath, filename } = req.file;
  const avatarPath = join(avatarsDir, filename);
  const avatarURL = join("avatars", filename);

  await rename(tempPath, avatarPath);

  const user = await findUser({ id });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  user.avatarURL = avatarURL;
  await user.save();

  res.status(200).json({ avatarURL });
};

export default {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getOneContactController: ctrlWrapper(getOneContactController),
  deleteContactController: ctrlWrapper(deleteContactController),
  createContactController: ctrlWrapper(createContactController),
  updateContactController: ctrlWrapper(updateContactController),
  updateStatusContactController: ctrlWrapper(updateStatusContactController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
};
