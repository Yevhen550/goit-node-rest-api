import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateListContact = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
};

export const getOneContact = async (contactId) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((item) => item.id === contactId);

  return contact || null;
};

export const createContact = async (data) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateListContact(contacts);

  return newContact;
};

export const deleteContact = async (contactId) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;
  const [result] = contacts.splice(idx, 1);
  await updateListContact(contacts);

  return result;
};

export const updateContact = async (contactId, newData) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) return null;

  contacts[idx] = { ...contacts[idx], ...newData };
  await updateListContact(contacts);

  return contacts[idx];
};
